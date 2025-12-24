FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Installer kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
 && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Installer kind
RUN curl -Lo /usr/local/bin/kind https://kind.sigs.k8s.io/dl/v0.23.0/kind-linux-amd64 \
 && chmod +x /usr/local/bin/kind

# Python + Node
RUN apt-get update && apt-get install -y python3-pip nodejs npm
