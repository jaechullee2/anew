# 1. Build image
FROM golang:1.13 AS builder

# install dependencies
WORKDIR /go/src/github.com/asashiho/dockertext-greet
RUN go get -d -v github.com/urfave/cli

# Build Modules
COPY main.go .
RUN GOOS=linux go build -a -o greet .

##-------------------------------------
# 2. Prodution Image
FROM busybox
WORKDIR /opt/greet/bin

# Deploy modules
COPY --from=builder /go/src/github.com/asashiho/dockertext-greet/ .
ENTRYPOINT ["./greet"]
