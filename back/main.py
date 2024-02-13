from typing import Annotated

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse

import torch
import torchvision.transforms as transforms
from PIL import Image
import io

from model import ResNet9
from utils import predict_image


app = FastAPI(
    root_path="/api",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
)


@app.on_event("startup")
async def startup_event():
    """
    Initialize FastAPI and add variables
    """
    # Initialize the pytorch model
    import __main__

    setattr(__main__, "ResNet9", ResNet9)
    model = torch.load(
        "plant-disease-model-complete.pth", map_location=torch.device("cpu")
    )

    transform = transforms.Compose(
        [transforms.ToTensor(), transforms.Resize((256, 256))]
    )
    print(model)

    # add model and other preprocess tools too app state
    app.package = {"transform": transform, "model": model}  # joblib.load


@app.post("/files/")
async def create_files(files: Annotated[list[bytes], File()]):
    image_data = files[0]
    image = Image.open(io.BytesIO(image_data))
    img_tensor = app.package["transform"](image)

    print(predict_image(img_tensor, app.package["model"]))
    return predict_image(img_tensor, app.package["model"])


@app.get("/")
async def main():
    content = """
        <body>
        <form action="/files/" enctype="multipart/form-data" method="post">
        <input name="files" type="file" multiple>
        <input type="submit">
        </form>
        </body>
    """
    return HTMLResponse(content=content)
