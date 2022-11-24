build:
	docker build -t nodejs .
run:
	docker run -it --name nodejs nodejs 
ps :
	docker ps -a
img:
	docker images
rm:
	docker rm -f $$(docker ps -aq)
rmi:
	docker rmi $$(docker images -q)
