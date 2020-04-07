# Projet Mobile (IONIC)
Ce projet concerne l'UE Projet Mobile (M2 GI) au sein de l'Université de Grenoble-Alpes.

Pour builder l'application et la déployer sur votre appareil android:
ionic cordova run android
ionic cordova build android --prod

L'application compore une CI/CD qui permet de déployer l'apk et récupérer les artifacts, vous pouvez trouver plus de détail dans la vidéo 6


## Fonctionnalités implémentées
 

###Les services de sécurité :  

La sécurité dans notre application est gérée via un système d’authentification sous trois formes :  

Nous avons implémenté un service qui permet de se connecter via un couplet email, mot de passe. 

* L’application demande une vérification supplémentaire lors de la création du compte en envoyant un mail au titulaire du mail. 

* L’application permet également la récupération du compte après un oubli du mot de passe par exemple ou un piratage. 

* L’authentification native via un compte Facebook 

* L’authentification native via un compte Google 

 

###Le service de partage de liste entre utilisateur :  

Notre application met à disposition un service de partage de liste entre plusieurs utilisateurs et pour arriver à cette fin nous avons réalisé plusieurs fonctionnalités : 

* Chaque todolist est affecté à l’utilisateur qui l’a créé et qui a des droits d’admin dessus. 

* Le propriétaire d’une todolist peut la modifier la supprimer et la partagé avec d’autre utilisateurs. 

* Le partage de todolist peut étre sous deux formats : 

    - Reader : l’utilisateur avec qui on a partagé la todolist peut juste lire et non écrire. 

    - Writer : l’utilisateur avec qui on a partagé la todolist peut juste lire et écrire. 

* Une todolist comporte des tâches qui sont créer par le propriétaire ou par les autres utilisateurs avec qui la todolist est partagé. 

* Chaque tâche peut être modifier, supprimer ou programmer un rappel 

 

 

L’application comporte également une partie où l’utilisateur peut accéder à ses informations personnelles comme son nom d’utilisateur, son adresse mail et également sa photo de profile. 
L’utilisateur peut changer sa photo de profile en prenant une photo depuis la caméra de son téléphone, et puis la stocker dans le firebase storage. 

## mode opératoire
