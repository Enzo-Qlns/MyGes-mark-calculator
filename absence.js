const nombreDeNote = document.querySelectorAll("#marksForm\\:missingsWidget\\:missingsTable_data>tr>td:first-child").length;

function get_date()
{
    let to_return = [];
    const Array = document.querySelectorAll("#marksForm\\:missingsWidget\\:missingsTable_data>tr>td:first-child");
    Array.forEach((item) =>
    {
        to_return.push(item.textContent.match(/\d+h\d+/g).join(''));
    });
    return to_return;
}

function get_matiere()
{
    const Array = document.querySelectorAll("#marksForm\\:missingsWidget\\:missingsTable_data>tr>td.mg_inherit_bg");
    let to_return = [];
    Array.forEach((item) =>
    {
        to_return.push(item.textContent.match(/(?<=B\d+ ).*/g).join(''));
    });
    return to_return;
};

function get_type()
{
    const Array = document.querySelectorAll("#marksForm\\:missingsWidget\\:missingsTable_data>tr>td:nth-child(0n+3)");
    let to_return = [];
    Array.forEach((item) =>
    {
        to_return.push(item.textContent);
    });
    return to_return;
};

function is_justify()
{
    const Array = document.querySelectorAll("#marksForm\\:missingsWidget\\:missingsTable_data>tr>td:nth-child(0n+4)");
    let to_return = [];
    Array.forEach((item) =>
    {
        to_return.push(item.textContent == "Oui" ? true : false);
    });
    return to_return;
};

function globalObject()
{
    var finalObject = []
    for (let i = 0; i < nombreDeNote; i++)
        if (!is_justify()[i])
            finalObject.push({ "date":  get_date()[i], "matiere": get_matiere()[i], "type": get_type()[1], "justify": is_justify()[i]});
    return finalObject;
};

function finalObject()
{
    const result = [];
    const count = {};
    for (const item of globalObject())
    {
        const { matiere } = item;
        if (count[matiere])
            count[matiere].absence_number++;
        else
            count[matiere] = { matiere, absence_number: 1 };
    }
    for (const key of Object.keys(count))
        result.push(count[key]);
    return result;
};

function generateTable(title, headers, data) {
    // Créer l'élément div conteneur du widget
    const missingsWidget = document.createElement("div");
    missingsWidget.id = "missingsWidget";
    missingsWidget.className = "mg_widget mg_widget_4x1 mg_widget_light orange";
  
    // Créer l'élément div pour le titre
    const titleDiv = document.createElement("div");
    titleDiv.className = "mg_title";
    const titleSpan = document.createElement("span");
    titleSpan.id = "marksForm:missingsWidget:title";
    titleSpan.textContent = title;
    titleDiv.appendChild(titleSpan);
    missingsWidget.appendChild(titleDiv);
  
    // Créer l'élément div pour le contenu
    const contentDiv = document.createElement("div");
    contentDiv.className = "mg_content";
  
    // Créer l'élément de tableau
    const table = document.createElement("table");
    table.setAttribute("role", "grid");
  
    // Créer l'en-tête du tableau
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
  
    // Créer les cellules d'en-tête
    headers.forEach((headerText, index) =>
    {
        const headerCell = document.createElement("th");
        if (index % 2 == 0)
            headerCell.className = "ui-state-default";
        else
            headerCell.className = "ui-state-default mg_inherit_bg";
        const headerSpan = document.createElement("span");
        headerSpan.className = "ui-column-title";
        headerSpan.textContent = headerText;
        headerCell.appendChild(headerSpan);
        headerRow.appendChild(headerCell);
    });
  
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    // Créer le corps du tableau
    const tbody = document.createElement("tbody");
  
    // Créer les lignes de données
    data.forEach((row) =>
    {
        const dataRow = document.createElement("tr");

        const matiereCell = document.createElement("td");
        const matiereSpan = document.createElement("span");
        matiereSpan.className = "mg_inherit_color";
        matiereSpan.textContent = row.matiere;
        matiereCell.appendChild(matiereSpan);
        dataRow.appendChild(matiereCell);

        const absenceNumberCell = document.createElement("td");
        absenceNumberCell.className = row.absence_number <= 5 ? "mg_payment_result_success" : "mg_payment_result_warning";
        absenceNumberCell.textContent = row.absence_number;
        dataRow.appendChild(absenceNumberCell);

        tbody.appendChild(dataRow);
    });
  
    table.appendChild(tbody);
  
    // Ajouter le tableau au contenu du widget
    const missingsTable = document.createElement("div");
    missingsTable.id = "marksForm:missingsWidget:missingsTable";
    missingsTable.className = "ui-datatable ui-widget";
    const tableWrapper = document.createElement("div");
    tableWrapper.className = "ui-datatable-tablewrapper";
    tableWrapper.appendChild(table);
    missingsTable.appendChild(tableWrapper);
  
    contentDiv.appendChild(missingsTable);
    missingsWidget.appendChild(contentDiv);
  
    // Ajouter le widget au document
    const marksForm = document.getElementById('marksForm');
    marksForm.appendChild(missingsWidget);
};

generateTable("Nombre total d'absence", ["Matière", "Nombre d'absences"], finalObject());