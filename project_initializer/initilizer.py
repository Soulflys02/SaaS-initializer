import questionary
from git import Repo
import os
import shutil
import subprocess
from utils import log, edit_file, RequiredValidator, remove_line_containing, success

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
    log("Initializing the project...")
    python_str_packages, react_str_packages = get_packages(selected_features)
    # Django project initialization
    os.makedirs(f"{project_name}/backend")
    subprocess.run(
        f"\
        python -m venv .venv\
        && source .venv/bin/activate\
        && pip install --upgrade pip\
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
    shutil.move("template_repo/frontend/.gitignore", f"{project_name}/frontend/.gitignore")
    shutil.move("template_repo/frontend/.env", f"{project_name}/frontend/.env")
    shutil.move("template_repo/frontend/src/index.css", f"{project_name}/frontend/src/index.css")
    shutil.move("template_repo/frontend/src/main.tsx", f"{project_name}/frontend/src/main.tsx")
    shutil.move("template_repo/frontend/src/PATHS.tsx", f"{project_name}/frontend/src/PATHS.tsx")
    os.mkdir(f"{project_name}/frontend/src/components")
    os.mkdir(f"{project_name}/frontend/src/features")
    os.mkdir(f"{project_name}/frontend/src/hooks")
    shutil.move("template_repo/frontend/src/hooks/useAxios.tsx", f"{project_name}/frontend/src/hooks/useAxios.tsx")
    os.mkdir(f"{project_name}/frontend/src/pages")
    os.mkdir(f"{project_name}/frontend/src/services")
    shutil.move("template_repo/frontend/src/services/backend.tsx", f"{project_name}/frontend/src/services/backend.tsx")
    os.mkdir(f"{project_name}/frontend/src/stores")
    os.mkdir(f"{project_name}/frontend/src/types")
    os.mkdir(f"{project_name}/frontend/src/layouts")
    os.remove(f"{project_name}/frontend/src/assets/react.svg")
    os.remove(f"{project_name}/frontend/src/App.css")

    success("Project initialized successfully.")
    
def add_features(project_name: str, selected_features: list[str]):
    """
    Add files based on selected features.
    """
    SRC_BACKEND_DIR = "template_repo/backend"
    DST_BACKEND_DIR = f"{project_name}/backend"
    SRC_FRONTEND_DIR = "template_repo/frontend/src"
    DST_FRONTEND_DIR = f"{project_name}/frontend/src"

    for feature in FEATURES:
        if feature in selected_features:
            match feature:
                case "Authentication":
                    log("Adding authentication feature...")
                    # Backend
                    shutil.move(f"{SRC_BACKEND_DIR}/auth", f"{DST_BACKEND_DIR}/auth")
                    # Frontend
                    shutil.move(f"{SRC_FRONTEND_DIR}/components/Logout.tsx", f"{DST_FRONTEND_DIR}/components/Logout.tsx")
                    shutil.move(f"{SRC_FRONTEND_DIR}/components/ProtectedRoute.tsx", f"{DST_FRONTEND_DIR}/components/ProtectedRoute.tsx")
                    shutil.move(f"{SRC_FRONTEND_DIR}/features/auth", f"{DST_FRONTEND_DIR}/features/auth")
                    shutil.move(f"{SRC_FRONTEND_DIR}/pages/Home.tsx", f"{DST_FRONTEND_DIR}/pages/Home.tsx")
                    shutil.move(f"{SRC_FRONTEND_DIR}/pages/Login.tsx", f"{DST_FRONTEND_DIR}/pages/Login.tsx")
                    shutil.move(f"{SRC_FRONTEND_DIR}/stores/useUserStore.tsx", f"{DST_FRONTEND_DIR}/stores/useUserStore.tsx")
                    shutil.move(f"{SRC_FRONTEND_DIR}/types/User.tsx", f"{DST_FRONTEND_DIR}/types/User.tsx")
                    shutil.move(f"{SRC_FRONTEND_DIR}/App.tsx", f"{DST_FRONTEND_DIR}/App.tsx")
                    success("Authentication feature added successfully.")
                case "API":
                    log("Adding API feature...")
                    # Backend
                    shutil.move(os.path.join(SRC_BACKEND_DIR, "api"), os.path.join(DST_BACKEND_DIR, "api"))
                    success("API feature added successfully.")
                    

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
    success("Repository cloned successfully.")
    init_project(project_name, selected_features)
    add_features(project_name, selected_features)
    
if __name__ == "__main__":
    main()