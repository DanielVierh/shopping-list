/**
 * 
 */
export function backup(saveobj) {
    
     //* Add identifier to check on read and set the name
     saveobj.identifier = 'shoppinglist'

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
                    //TODO - Check if identifier is korrekt

                    //TODO - set as new local storage obj
                    document.getElementById('jsonOutput').textContent = JSON.stringify(json, null, 2); // Anzeigen
                    statusLabel.innerHTML = 'Backup erfolgreich importiert'
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                } catch (err) {
                    console.error("Fehler beim Parsen der Datei:", err);
                    alert("Fehler: Die Datei enthält kein gültiges JSON.");
                }
            };
            reader.readAsText(file); // Datei-Inhalt als Text laden
        }
    });
    
}