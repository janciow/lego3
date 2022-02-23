## Setup

```bash

kubectl get services -n ingress-nginx

http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser

http://servicename.namescpace.svc.cluster.local

```

## env variables

```bash
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

kubectl get secrets
```

## docker 

```bash
docker stop <id> it shoting dow softly 10s it kill him
docker kill <id> shot down right now

---- Redis docker ----

docker run redis

docker exec -it <continer id> <command> 
docker exec -it ac1e9ff67a3b redis-cli

docker exec -it ac1e9ff67a3b sh --> commands in container  [bash | powershell | zsh | sh]
ctrl + d --> exit

--- create image from Dockerfile ---

docker build -t janciow27/redis:latest .
docker run docker.io/janciow27/redis:latest

docker commit -c "CMD 'redis-server'" CONTAINERID

---- node js in docker container ----

docker build -t janciow27/simpleweb .
docker run -p 8080 : 8080 <image id>
docker run -p 8080:8080  docker.io/janciow27/simpleweb


-------- posts
docker.io/janciow27/posts

docker run -it janciow27/posts sh


---kubernetes 

 kubectl apply -f posts.yaml
 kubectl get pods
kubectl exec -it posts sh
kubectl describe pod  posts

kubectl apply -f posts-depl.yaml
kubectl get deployments
kubectl describe deployment posts-depl

kubectl delete pod posts


kubectl apply -f posts-depl.yaml
 kubectl rollout restart deployment posts-depl

--- kube services 
node port 
 kubectl apply -f posts-srv.yaml
 kubectl get services


--- create image for event bus and deploy
docker build -t janciow27/event-bus .
docker push janciow27/event-bus 
kubectl apply -f event-bus-depl.yaml

--- testing our pods

kubectl get pods
delete service posts-client-ip-srv
```