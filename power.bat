cd C:\Users\~Trofel~\Desktop\e-Kali

git add .gitignore
git add *

set /p commitMessage="Titre du commit : "

git commit -m "%commitMessage%"
git push 