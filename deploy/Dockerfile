FROM python:3.12
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -yq update \
    && apt-get -yq install build-essential libffi-dev python-dev-is-python3 \
    && apt-get purge -y --auto-remove

RUN python3 -m pip install --upgrade pip

COPY ./requirements.txt /requirements.txt

RUN pip install --no-cache-dir --upgrade -r /requirements.txt