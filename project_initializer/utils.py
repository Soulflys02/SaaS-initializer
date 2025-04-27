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
    questionary.print(f"[INFO] {message}", style="bold fg:yellow")

def success(message):
    questionary.print(f"[SUCCESS] {message}", style="bold fg:green")

def error(message):
    questionary.print(f"[ERROR] {message}", style="bold fg:red")

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

def edit_line_containing(file_path, lines_to_edit, new_lines=None):
    """
    Modifies lines in a file containing specific values.

    :param file_path: Path to the file to be modified.
    :param lines_to_edit: List of values of the lines to be modified.
    """
    with open(file_path, 'r') as file:
        lines = file.readlines()

    # Filter the lines to keep
    filtered_lines = []
    for line in lines:
        for i, line_to_edit in enumerate(lines_to_edit):
            if not line_to_edit in line:
                filtered_lines.append(line)
            else:
                if new_lines:
                    # Add the new lines in place of the matching line
                    filtered_lines.append(new_lines[i])

    # Rewrite the file with the filtered lines
    with open(file_path, 'w') as file:
        file.writelines(filtered_lines)
