cd C:\Users\~Trofel~\Desktop\e-Kali

git add .gitignore
git add *

set /p commitMessage="Entrez votre message de commit : "

git commit -m "%commitMessage%"
git push 