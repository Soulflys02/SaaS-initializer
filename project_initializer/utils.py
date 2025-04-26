import questionary

class RequiredValidator(questionary.Validator):
    def validate(self, document):
        if len(document.text) == 0:
            raise questionary.ValidationError(
                message="Please enter a value.",
                cursor_position=len(document.text)
            )
        return True
    
def log(message):
    print(f"[INFO] {message}")

def edit_file(file_path, new_content="", start_line=None, end_line=None, line_content=False):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    if line_content:
        # Find the line number of the specified content

        for i, line in enumerate(lines):
            if line_content in line:
                if not lines[i].endswith(",\n"):
                    lines[i-1] = lines[i-1].rstrip(",\n") + "\n"
                lines[i] = new_content
    else:
        # Replace the specified lines with new content
        lines[start_line:end_line] = new_content
            
    with open(file_path, 'w') as file:
                file.writelines(lines)

def remove_line_containing(file_path, lines_to_remove):
    """
    Supprime les lignes d'un fichier contenant des valeurs spécifiques.

    :param file_path: Chemin du fichier à modifier.
    :param lines_to_remove: Liste des valeurs des lignes à supprimer.
    """
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Filtrer les lignes à conserver
    filtered_lines = []
    for i, line in enumerate(lines):
        if not any(line_to_remove in line for line_to_remove in lines_to_remove):
            filtered_lines.append(line)
        else:
            # Supprimer la virgule de la ligne précédente si nécessaire
            if i > 0 and not line.strip().endswith(","):
                filtered_lines[-1] = filtered_lines[-1].rstrip(",\n") + "\n"

    # Réécrire le fichier avec les lignes filtrées
    with open(file_path, 'w') as file:
        file.writelines(filtered_lines)
                 