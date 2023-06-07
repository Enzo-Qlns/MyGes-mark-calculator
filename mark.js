var tool = 
{
    get_sum_array: function (arr) 
    {
        return arr.reduce((a, b) => a + b, 0);
    },

    check_pair: function (nbr)
    {
        return nbr % 2 == 0 ? true : false;
    },

    round_value: function (nbr, power) 
    {
        return Number.parseInt(nbr) && Number.parseFloat(nbr) ? Math.round((nbr) * Math.pow(10, power)) / Math.pow(10, power) : nbr;
    },

    delete_array_value: function(arr, value)
    {
        return arr.filter(x => x !== value);
    }
}

function get_Average(col) 
{
    array_note_coef = [];
    let notes, coefs;

    const subjects = document.querySelectorAll("#marksForm\\:marksWidget\\:coursesTable_data>tr").length;
    for (i = 0; i <= subjects - 1; i++) 
    {
        if (col === 1) 
        {
            notes = document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(5)`);
            coefs = document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(3)`);
            blocs = document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(1)`);
        } 
        else if (col === 2) 
        {
            notes = document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(6)`);
            coefs = document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(3)`);
            blocs = document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(1)`);
        } 
        else if (col === 3) 
        {
            notes = document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(7)`);
            coefs = document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(3)`);
            blocs = document.querySelectorAll(`#marksForm\\:marksWidget\\:coursesTable_data > tr:nth-child(${i}) > td:nth-child(1)`);
        }

        notes.forEach(note => 
        {
            coefs.forEach(coef => 
            {
                blocs.forEach(td => 
                {
                    array_note_coef.push([
                        (td.innerHTML.match(/(B\d+)/g)).join(''), Number.parseFloat(coef.innerHTML), Number.parseFloat((note.innerHTML).replace(',', '.'))
                    ])
                });
            });
        });
    };


    let MoyenneB1, MoyenneB2, MoyenneB3, MoyenneB4;
    let AllMoyenne = [];

    let calculCoef = 0;
    let calculNote = 0;
    for (i in array_note_coef) 
    {
        if (!Number.isNaN(array_note_coef[i][2])) 
        {
            if (array_note_coef[i][0] === 'B1') 
            {
                calculNote += array_note_coef[i][1] * array_note_coef[i][2];
                calculCoef += array_note_coef[i][1];
                MoyenneB1 = tool.round_value((calculNote / calculCoef), 2);
            }
            else if (array_note_coef[i][0] === 'B2') 
            {
                calculCoef = 0;
                calculNote = 0;
                calculNote += array_note_coef[i][1] * array_note_coef[i][2];
                calculCoef += array_note_coef[i][1];
                MoyenneB2 = tool.round_value((calculNote / calculCoef), 2);
            }
            else if (array_note_coef[i][0] === 'B3') 
            {
                calculCoef = 0;
                calculNote = 0;
                calculNote += array_note_coef[i][1] * array_note_coef[i][2];
                calculCoef += array_note_coef[i][1];
                MoyenneB3 = tool.round_value((calculNote / calculCoef), 2);
            }
            else if (array_note_coef[i][0] === 'B4') 
            {
                calculCoef = 0;
                calculNote = 0;
                calculNote += array_note_coef[i][1] * array_note_coef[i][2];
                calculCoef += array_note_coef[i][1];
                MoyenneB4 = tool.round_value((calculNote / calculCoef), 2);
            }
        }
    }

    AllMoyenne.push(MoyenneB1, MoyenneB2, MoyenneB3, MoyenneB4);
    AllMoyenne = AllMoyenne.map(val => val === undefined ? "nc" : val);

    return AllMoyenne;
}

function get_note_by_row(row)
{
    row--;
    let obj = [];
    let trMoyenneFinale;

    obj.push(get_Average(1)[row], get_Average(2)[row], (get_Average(3)[row]) * 2);
    obj = tool.delete_array_value(obj, "nc");

    trMoyenneFinale = tool.get_sum_array(obj);

    return tool.round_value(trMoyenneFinale / (obj.length + 1), 2);
}

function get_moyenne_by_col(array) 
{
    let AllMoyenne_for_Col = array.map(val => val === "nc" ? 0 : val);
    let count = 0;
    let Moyenne_Global = 0;
    for (i in AllMoyenne_for_Col)
    {
        if (AllMoyenne_for_Col[i] !== 0) 
        {
            Moyenne_Global = tool.get_sum_array(AllMoyenne_for_Col);
            count++;
        }
    }
    return Moyenne_Global / count;
}

function CreateTable()
{

    const tbody = document.querySelector("#marksForm\\:marksWidget\\:coursesTable_data");

    // ligne vide
    const trBlank = document.createElement('tr');
    trBlank.className = "tr"
    trBlank.id = 'Blank';
    tdBlank = document.createElement('td');
    tdBlank.innerHTML = '';
    tdBlank.colSpan = 7;

    // ligne CC && Exam
    const tr_CC_Exam = document.createElement('tr');
    tr_CC_Exam.className = "tr"
    tr_CC_Exam.id = '_CC_Exam';

    const td_Blank = document.createElement('td');
    const td_CC1 = document.createElement('td');
    const td_CC2 = document.createElement('td');
    const td_Exam = document.createElement('td');

    td_Blank.innerHTML = `Aperçu de vos Moyennes du ${document.querySelector("#marksForm\\:j_idt172\\:periodSelect_label").innerHTML.match(/Semestre\s\d+/g).join('')}`;
    td_Blank.style.fontSize = '27px';
    td_Blank.style.fontWeight = 535;
    td_Blank.style.color = '#264653';
    td_Blank.style.textAlign = 'center';
    td_Blank.colSpan = 4;
    td_CC1.innerHTML = 'CC1';
    td_CC1.style.textAlign = 'center';
    td_CC1.style.fontSize = '27px';
    td_CC1.style.fontWeight = 535;
    td_CC1.style.color = '#676562';
    td_CC2.innerHTML = 'CC2';
    td_CC2.style.textAlign = 'center';
    td_CC2.style.fontSize = '27px';
    td_CC2.style.fontWeight = 535;
    td_CC2.style.color = '#676562';
    td_Exam.innerHTML = 'Exam';
    td_Exam.style.textAlign = 'center';
    td_Exam.style.fontSize = '27px';
    td_Exam.style.fontWeight = 535;
    td_Exam.style.color = '#676562';

    tr_CC_Exam.append(td_Blank, td_CC1, td_CC2, td_Exam);


    // ligne B1
    const trB1 = document.createElement('tr');
    trB1.className = "tr"
    trB1.id = 'B1';

    const td_B1 = document.createElement('td');
    const td_B1_CC1 = document.createElement('td');
    const td_B1_CC2 = document.createElement('td');
    const td_B1_Exam = document.createElement('td');

    td_B1.innerHTML = 'B1';
    td_B1.style.textAlign = 'center';
    td_B1.style.fontSize = '27px';
    td_B1.style.fontWeight = 535;
    td_B1.style.color = '#676562';
    td_B1.colSpan = 4;
    td_B1_CC1.innerHTML = tool.round_value(get_Average(1)[0], 2);
    td_B1_CC1.style.background = get_Average(1)[0] === 'nc' ? '#bcbcbc' : get_Average(1)[0] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(1) <= 12 ? '#f4a261' : '#2a9d8f';
    td_B1_CC1.style.textAlign = 'center';
    td_B1_CC1.style.fontSize = '20px';
    td_B1_CC2.innerHTML = tool.round_value(get_Average(2)[0], 2);
    td_B1_CC2.style.background = get_Average(2)[0] === 'nc' ? '#bcbcbc' : get_Average(2)[0] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(2) <= 12 ? '#f4a261' : '#2a9d8f';
    td_B1_CC2.style.textAlign = 'center';
    td_B1_CC2.style.fontSize = '20px';
    td_B1_Exam.innerHTML = tool.round_value(get_Average(3)[0], 2);
    td_B1_Exam.style.background = get_Average(3)[0] === 'nc' ? '#bcbcbc' : get_Average(3)[0] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(3) <= 12 ? '#f4a261' : '#2a9d8f';
    td_B1_Exam.style.textAlign = 'center';
    td_B1_Exam.style.fontSize = '20px';


    // Ligne B2
    const trB2 = document.createElement('tr');
    trB2.className = "tr"
    trB2.id = 'B2';

    const td_B2 = document.createElement('td');
    const td_B2_CC1 = document.createElement('td');
    const td_B2_CC2 = document.createElement('td');
    const td_B2_Exam = document.createElement('td');

    td_B2.innerHTML = 'B2';
    td_B2.style.textAlign = 'center';
    td_B2.style.fontSize = '27px';
    td_B2.style.fontWeight = 535;
    td_B2.style.color = '#676562';
    td_B2.colSpan = 4;
    td_B2_CC1.innerHTML = tool.round_value(get_Average(1)[1], 2);
    td_B2_CC1.style.background = get_Average(1)[1] === 'nc' ? '#bcbcbc' : get_Average(1)[1] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(1)[1] <= 12 ? '#f4a261' : '#2a9d8f';
    td_B2_CC1.style.textAlign = 'center';
    td_B2_CC1.style.fontSize = '20px';
    td_B2_CC2.innerHTML = tool.round_value(get_Average(2)[1], 2);
    td_B2_CC2.style.background = get_Average(2)[1] === 'nc' ? '#bcbcbc' : get_Average(2)[1] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(2)[1] <= 12 ? '#f4a261' : '#2a9d8f';
    td_B2_CC2.style.textAlign = 'center';
    td_B2_CC2.style.fontSize = '20px';
    td_B2_Exam.innerHTML = tool.round_value(get_Average(3)[1], 2);
    td_B2_Exam.style.background = get_Average(3)[1] === 'nc' ? '#bcbcbc' : get_Average(3)[1] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(3)[1][1] <= 12 ? '#f4a261' : '#2a9d8f';
    td_B2_Exam.style.textAlign = 'center';
    td_B2_Exam.style.fontSize = '20px';


    // Ligne B3
    const trB3 = document.createElement('tr');
    trB3.className = "tr"
    trB3.id = 'B3';

    const td_B3 = document.createElement('td');
    const td_B3_CC1 = document.createElement('td');
    const td_B3_CC2 = document.createElement('td');
    const td_B3_Exam = document.createElement('td');

    td_B3.innerHTML = 'B3';
    td_B3.style.textAlign = 'center';
    td_B3.style.fontSize = '27px';
    td_B3.style.fontWeight = 535;
    td_B3.style.color = '#676562';
    td_B3.colSpan = 4;
    td_B3_CC1.innerHTML = tool.round_value(get_Average(1)[2], 2);
    td_B3_CC1.style.background = get_Average(1)[2] === 'nc' ? '#bcbcbc' : get_Average(1)[2] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(1)[2][1] <= 12 ? '#f4a261' : '#2a9d8f';
    td_B3_CC1.style.textAlign = 'center';
    td_B3_CC1.style.fontSize = '20px';
    td_B3_CC2.innerHTML = tool.round_value(get_Average(2)[2], 2);
    td_B3_CC2.style.background = get_Average(2)[2] === 'nc' ? '#bcbcbc' : get_Average(2)[2] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(2)[2][1] <= 12 ? '#f4a261' : '#2a9d8f';
    td_B3_CC2.style.textAlign = 'center';
    td_B3_CC2.style.fontSize = '20px';
    td_B3_Exam.innerHTML = tool.round_value(get_Average(3)[2], 2);
    td_B3_Exam.style.background = get_Average(3)[2] === 'nc' ? '#bcbcbc' : get_Average(3)[2] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(3)[2][1] <= 12 ? '#f4a261' : '#2a9d8f';
    td_B3_Exam.style.textAlign = 'center';
    td_B3_Exam.style.fontSize = '20px';


    // Ligne B4
    const trB4 = document.createElement('tr');
    trB4.className = "tr"
    trB4.id = 'B4';

    const td_B4 = document.createElement('td');
    const td_B4_CC1 = document.createElement('td');
    const td_B4_CC2 = document.createElement('td');
    const td_B4_Exam = document.createElement('td');

    td_B4.innerHTML = 'B4';
    td_B4.style.textAlign = 'center';
    td_B4.style.fontSize = '27px';
    td_B4.style.fontWeight = 535;
    td_B4.style.color = '#676562';
    td_B4.colSpan = 4;
    td_B4_CC1.innerHTML = tool.round_value(get_Average(1)[3], 2);
    td_B4_CC1.style.background = get_Average(1)[3] === 'nc' ? '#bcbcbc' : get_Average(1)[3] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(1)[3][1] <= 12 ? '#f4a261' : '#2a9d8f';
    td_B4_CC1.style.textAlign = 'center';
    td_B4_CC1.style.fontSize = '20px';
    td_B4_CC2.innerHTML = tool.round_value(get_Average(2)[3], 2);
    td_B4_CC2.style.background = get_Average(2)[3] === 'nc' ? '#bcbcbc' : get_Average(2)[3] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(2)[3][1] <= 12 ? '#f4a261' : '#2a9d8f';
    td_B4_CC2.style.textAlign = 'center';
    td_B4_CC2.style.fontSize = '20px';
    td_B4_Exam.innerHTML = tool.round_value(get_Average(3)[3], 2);
    td_B4_Exam.style.background = get_Average(3)[3] === 'nc' ? '#bcbcbc' : get_Average(3)[3] < 10 ? 'rgba(231, 81, 81, 0.94)' : get_Average(3)[3][1] <= 12 ? '#f4a261' : '#2a9d8f';
    td_B4_Exam.style.textAlign = 'center';
    td_B4_Exam.style.fontSize = '20px';


    // ligne moyenne finale
    const trMoyenneFinale = document.createElement('tr');
    trMoyenneFinale.className = "tr"

    const tdTitleMoyenneFinale = document.createElement('td');
    const tdBlocs = document.createElement('td');
    
    tdTitleMoyenneFinale.innerHTML = "Moyenne Finale";
    tdTitleMoyenneFinale.id = "Moyenne_finale";
    tdTitleMoyenneFinale.style.fontSize = '27px';
    tdTitleMoyenneFinale.style.fontWeight = 535;
    tdTitleMoyenneFinale.style.color = '#264653';
    tdTitleMoyenneFinale.style.textAlign = 'center';
    tdTitleMoyenneFinale.colSpan = 1;
    tdBlocs.style.fontSize = '20px';
    tdBlocs.style.textAlign = 'center';
    tdBlocs.colSpan = 6;
    tdBlocs.innerHTML = 
        `<b style="font-size: 20px; color: ${get_note_by_row(1) < 10 ? 'rgba(231, 81, 81, 0.94)' : get_note_by_row(1) <= 12 ? '#f4a261' : '#2a9d8f'};">B1: </b>` + get_note_by_row(1) +
        `<b style="font-size: 20px; margin-left: 3vh; color: ${get_note_by_row(2) < 10 ? 'rgba(231, 81, 81, 0.94)' : get_note_by_row(2) <= 12 ? '#f4a261' : '#2a9d8f'};">B2: </b>` + get_note_by_row(2) +
        `<b style="font-size: 20px; margin-left: 3vh; color: ${get_note_by_row(3) < 10 ? 'rgba(231, 81, 81, 0.94)' : get_note_by_row(3) <= 12 ? '#f4a261' : '#2a9d8f'};">B3: </b>` + get_note_by_row(3) +
        `<b style="font-size: 20px; margin-left: 3vh; color: ${get_note_by_row(4) < 10 ? 'rgba(231, 81, 81, 0.94)' : get_note_by_row(4) <= 12 ? '#f4a261' : '#2a9d8f'};">B4: </b>` + get_note_by_row(4);
    

    // Ajout des élements
    trBlank.append(tdBlank);
    trB1.append(td_B1, td_B1_CC1, td_B1_CC2, td_B1_Exam);
    trB2.append(td_B2, td_B2_CC1, td_B2_CC2, td_B2_Exam);
    trB3.append(td_B3, td_B3_CC1, td_B3_CC2, td_B3_Exam);
    trB4.append(td_B4, td_B4_CC1, td_B4_CC2, td_B4_Exam);
    trMoyenneFinale.append(tdTitleMoyenneFinale, tdBlocs);
    tbody.append(trMoyenneFinale, trBlank, tr_CC_Exam, trB1, trB2, trB3, trB4);
};

// Create note button
const note = document.getElementById('marksForm:marksWidget:title');
note.setAttribute('style', 'cursor: pointer; text-decoration: underline; font-size: 16px;');

// MAIN
let count = 0;
note.addEventListener('click', () => 
{
    if (document.querySelectorAll("#marksForm\\:marksWidget\\:coursesTable_head>tr>th").length !== 5) 
    {
        tool.check_pair(count) ? CreateTable() : window.location.reload(), count = 0;
        count++;
    }
    else
    {
        alert('Pas de note');
    }
});
