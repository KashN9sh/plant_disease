from constants import labels, descriptions
import torch


# for moving data to device (CPU or GPU)
def to_device(data, device):
    """Move tensor(s) to chosen device"""
    if isinstance(data, (list, tuple)):
        return [to_device(x, device) for x in data]
    return data.to(device, non_blocking=True)


def predict_image(img, model):
    """Converts image to array and return the predicted class
    with highest probability"""
    # Convert to a batch of 1
    xb = to_device(img.unsqueeze(0), torch.device("cpu"))
    output = model(xb)
    probs = torch.nn.functional.softmax(output, dim=1)
    conf, preds = torch.max(probs, dim=1)
    print(conf, preds)
    # Get predictions from model
    # yb = model(xb)
    # # Pick index with highest probability
    # _, preds = torch.max(yb, dim=1)
    # print(_, preds)
    # Retrieve the class label
    result = descriptions.get(labels[preds[0].item()], {"name": labels[preds[0].item()]})
    result["confidence"] = round(conf.item() * 100)

    return result
