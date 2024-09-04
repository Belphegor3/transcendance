FROM python:3.9-slim-bullseye

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install -r /app/requirements.txt

# Install Gunicorn
RUN pip install gunicorn

# Copy the Django project
COPY srcs/principale /app/principale

# Expose the port for Gunicorn
EXPOSE 8000

# Command to run Gunicorn
CMD ["gunicorn", "-b", ":8000", "principale.wsgi"]
