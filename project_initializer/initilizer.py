import questionary
from git import Repo
import os
import shutil
import subprocess
from utils import log, edit_file, RequiredValidator, remove_line_containing

def get_packages(selected_features: list[str]) -> str:
    """
    Get the list of packages to be installed based on the selected features.
    """
    # Default packages
    python_packages = [
        "djangorestframework",
        "django",
        "django-cors-headers",
        "python-dotenv",
    ]
    react_packages = [
        "react-router",
        "axios",
        "tailwindcss",
        "@tailwindcss/vite",
    ]
    # Adding packages based on selected features
    for feature in selected_features:
        match feature:
            case "Authentication":
                python_packages.append("djangorestframework_simplejwt")
                react_packages.append("zustand")
            
    return " ".join(python_packages), " ".join(react_packages)

def init_project(project_name: str, selected_features: list[str]):
    """
    Initialize the project with packages for selected features.
    """
    python_str_packages, react_str_packages = get_packages(selected_features)

    log("Initializing the project...")
    # Django project initialization
    os.makedirs(f"{project_name}/backend")
    subprocess.run(
        f"\
        python -m venv .venv\
        && source .venv/bin/activate\
        && pip install {python_str_packages}\
        && pip freeze > requirements.txt\
        && django-admin startproject {project_name} .\
        ",
        shell=True,
        cwd=f"{project_name}/backend"
    )
    shutil.move("template_repo/backend/utils", f"{project_name}/backend/utils")
    shutil.move("template_repo/backend/.gitignore", f"{project_name}/backend/.gitignore")

    # React project initialization
    os.makedirs(f"{project_name}/frontend")
    subprocess.run(f"\
        yarn create vite . --template react-swc-ts\
        && yarn add {react_str_packages}\
        ",
        shell=True,
        cwd=f"{project_name}/frontend"
    )
    shutil.move("template_repo/frontend/vite.config.ts", f"{project_name}/frontend/vite.config.ts")
    

def main():
    global FEATURES
    FEATURES = [
        "Authentication", 
        "API",
    ]

    answers = questionary.form(
        project_name = questionary.text("What is the name of your project?", validate=RequiredValidator),
        features = questionary.checkbox("Select the features you want to include in your project:", choices=FEATURES)
    ).ask()

    project_name = answers['project_name']
    selected_features = answers['features']

    log("Cloning the repository...")
    Repo.clone_from("https://github.com/Soulflys02/web-dev-framework.git", "template_repo")

    init_project(project_name, selected_features)
    
if __name__ == "__main__":
    main()