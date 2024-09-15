/**
 * 
 */
export function backup(saveobj) {

    //* Add identifier to check on read and set the name
    const identifier = 'shoppinglist'
    saveobj.identifier = identifier;

    //* Add current date for the file name
    const dte = new Date();
    const d = dte.getDate();
    const m = dte.getMonth() + 1
    const y = dte.getFullYear();
    const date = `${d}.${m}.${y}`




    //* ANCHOR - Export File
    // Funktion zum Speichern der JSON-Datei
    document.getElementById('saveJsonBtn').addEventListener('click', () => {
        const json = JSON.stringify(saveobj, null, 2); // JSON konvertieren und formatieren
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Erstellen eines unsichtbaren Anker-Elements für den Download
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_einkaufsliste_${date}.json`;
        document.body.appendChild(a);
        a.click(); // Automatischer Klick, um die Datei herunterzuladen
        document.body.removeChild(a); // Entfernen des Anker-Elements
        URL.revokeObjectURL(url); // Aufräumen der URL
    });

    //* ANCHOR - Import File

    document.getElementById('uploadJsonBtn').addEventListener('change', function (event) {
        const file = event.target.files[0]; // Erste ausgewählte Datei
        const statusLabel = document.getElementById('status');

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                try {
                    const json = JSON.parse(e.target.result); // JSON parsen
                    if (json.identifier === identifier) {
                        //TODO - set as new local storage obj
                        localStorage.setItem('stored_shopping_saveobj', JSON.stringify(json));
                        statusLabel.innerHTML = 'Backup erfolgreich importiert'
                        statusLabel.style.color = 'lightgreen'
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }else {
                        statusLabel.innerHTML = 'Backup konnte nicht geladen werden';
                        statusLabel.style.color = 'red'
                        return
                    }
                } catch (err) {
                    statusLabel.innerHTML = 'Backup konnte nicht geladen werden'
                    statusLabel.style.color = 'red'
                    console.error("Fehler beim Parsen der Datei:", err);
                    alert("Fehler: Die Datei enthält kein gültiges JSON.");
                }
            };
            reader.readAsText(file); // Datei-Inhalt als Text laden
        }
    });

}