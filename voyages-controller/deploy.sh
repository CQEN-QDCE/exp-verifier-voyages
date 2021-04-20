oc new-project dec-issuer --display-name="PES DEC Émetteur" --description="Émetteur d'attestation d'Identité fondamentale pour le Directeur de l'État Civil"

oc new-build --image-stream nodejs --strategy source --binary=true --name=dec-issuer 

tar -zcvf deploy.tar.gz --exclude 'node_modules' --exclude 'build' --exclude 'deploy.tar.gz' .

oc start-build dec-issuer --from-archive=deploy.tar.gz

echo "Avant de dormir 240 sec."
sleep 240 

oc logs dec-issuer-1-build -f

oc new-app dec-issuer --allow-missing-imagestream-tags 

oc expose svc dec-issuer --name=emetteur

oc patch svc dec-issuer --patch '{"spec":{"ports":[{"name": "8080-tcp", "port": 8080, "targetPort": 10000 }]}}'

oc get route

rm deploy.tar.gz
