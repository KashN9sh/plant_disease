import torch  # Pytorch module
import torch.nn as nn  # for creating  neural networks
import torch.nn.functional as F  # for functions for calculating loss


class ImageClassificationBase(nn.Module):
    """
    Base class for the model
    """

    @staticmethod
    def accuracy(outputs, labels) -> torch.Tensor:
        """
        Calculate accuracy of the model
        """
        _, preds = torch.max(outputs, dim=1)
        return torch.tensor(torch.sum(preds == labels).item() / len(preds))

    def training_step(self, batch) -> torch.Tensor:
        """
        Training step for the model

        Args:
            batch: batch of data

        Returns:
            loss: loss of the model
        """
        images, labels = batch
        out = self(images)  # Generate predictions
        loss = F.cross_entropy(out, labels)  # Calculate loss
        return loss

    def validation_step(self, batch) -> dict[str, torch.Tensor]:
        images, labels = batch
        out = self(images)  # Generate prediction
        loss = F.cross_entropy(out, labels)  # Calculate loss
        acc = self.accuracy(out, labels)  # Calculate accuracy
        return {"val_loss": loss.detach(), "val_accuracy": acc}

    def validation_epoch_end(self, outputs) -> dict[str, torch.Tensor]:
        batch_losses = [x["val_loss"] for x in outputs]
        batch_accuracy = [x["val_accuracy"] for x in outputs]
        epoch_loss = torch.stack(batch_losses).mean()  # Combine loss
        epoch_accuracy = torch.stack(batch_accuracy).mean()
        return {
            "val_loss": epoch_loss,
            "val_accuracy": epoch_accuracy,
        }  # Combine accuracies

    def epoch_end(self, epoch, result) -> None:
        print(
            "Epoch [{}], last_lr: {:.5f}, train_loss: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
                epoch,
                result["lrs"][-1],
                result["train_loss"],
                result["val_loss"],
                result["val_accuracy"],
            )
        )


# Architecture for training


def conv_block(in_channels, out_channels, pool=False) -> nn.Sequential:
    """
    Convolutional block with BatchNormalization
    """

    layers = [
        nn.Conv2d(in_channels, out_channels, kernel_size=3, padding=1),
        nn.BatchNorm2d(out_channels),
        nn.ReLU(inplace=True),
    ]
    if pool:
        layers.append(nn.MaxPool2d(4))
    return nn.Sequential(*layers)


class ResNet9(ImageClassificationBase):
    """
    ResNet9 architecture
    """

    def __init__(self, in_channels, num_diseases):
        super().__init__()

        self.conv1 = conv_block(in_channels, 64)
        self.conv2 = conv_block(64, 128, pool=True)  # out_dim : 128 x 64 x 64
        self.res1 = nn.Sequential(conv_block(128, 128), conv_block(128, 128))

        self.conv3 = conv_block(128, 256, pool=True)  # out_dim : 256 x 16 x 16
        self.conv4 = conv_block(256, 512, pool=True)  # out_dim : 512 x 4 x 44
        self.res2 = nn.Sequential(conv_block(512, 512), conv_block(512, 512))

        self.classifier = nn.Sequential(nn.MaxPool2d(4), nn.Flatten(), nn.Linear(512, num_diseases))

    def forward(self, xb):  # xb is the loaded batch
        out = self.conv1(xb)
        out = self.conv2(out)
        out = self.res1(out) + out
        out = self.conv3(out)
        out = self.conv4(out)
        out = self.res2(out) + out
        out = self.classifier(out)
        return out
