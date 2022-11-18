# Step1 :
FROM ubuntu:latest

# Step2 :
RUN apt -y update && apt -y upgrade && apt -y install nginx && apt -y install curl

# Step3 :
COPY index.html /usr/share/nginx/html

# Step4 :
HEALTHCHECK --interval=10s --timeout=3s CMD curl -f http://localhost/ || exit 1

# Step5
CMD ["nginx","-g","daemon off;"]
