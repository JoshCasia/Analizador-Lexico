document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            let result = e.target.result;
            let text = '';
            for (let j = 0; j < result.length; j++) {
                text += result[j];
            }
            let textArea = document.getElementById('textArea');
            textArea.value = '';
            for (let k = 0; k < text.length; k++) {
                textArea.value += text[k];
            }
        };
        reader.readAsText(file);
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    let textArea = document.getElementById('textArea');
    textArea.value = '';
    let fileInput = document.getElementById('fileInput');
    fileInput.value = '';
    let tokensTable = document.querySelector('#tokensTable tbody');
    while (tokensTable.firstChild) {
        tokensTable.removeChild(tokensTable.firstChild);
    }
});

document.getElementById('analyzeButton').addEventListener('click', function() {
    let text = document.getElementById('textArea').value;
    analyzeText(text);
});

function analyzeText(text) {
    let tokensTable = document.querySelector('#tokensTable tbody');
    while (tokensTable.firstChild) {
        tokensTable.removeChild(tokensTable.firstChild);
    }
    let line = 1, col = 1;
    let i = 0;
    let length = 0;
    for (let c in text) {
        length++;
    }

    while (i < length) {
        let char = text[i];
        let token = '';
        let position = 'Línea ' + line + ', Columna ' + col;
        
        if (isLetter(char)) {
            while (i < length && (isLetter(text[i]) || isDigit(text[i]))) {
                token += text[i];
                i++;
                col++;
            }
            addRow(tokensTable, 'Identificador', token, position);
        } else if (isDigit(char)) {
            while (i < length && isDigit(text[i])) {
                token += text[i];
                i++;
                col++;
            }
            addRow(tokensTable, 'Número', token, position);
        } else if (isSymbol(char)) {
            addRow(tokensTable, 'Símbolo', char, position);
            i++;
            col++;
        } else if (char === '\n') {
            line++;
            col = 1;
            i++;
        } else {
            i++;
            col++;
        }
    }
}

function isLetter(char) {
    let letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
    for (let i = 0; i < letters.length; i++) {
        if (char === letters[i]) {
            return true;
        }
    }
    return false;
}

function isDigit(char) {
    let digits = '0123456789';
    for (let i = 0; i < digits.length; i++) {
        if (char === digits[i]) {
            return true;
        }
    }
    return false;
}

function isSymbol(char) {
    let symbols = '+-*/=;,.(){}[]';
    for (let i = 0; i < symbols.length; i++) {
        if (char === symbols[i]) {
            return true;
        }
    }
    return false;
}

function addRow(table, tokenType, tokenValue, position) {
    let row = document.createElement('tr');
    let cell1 = document.createElement('td');
    let cell2 = document.createElement('td');
    let cell3 = document.createElement('td');
    
    cell1.textContent = tokenType;
    cell2.textContent = tokenValue;
    cell3.textContent = position;
    
    row.appendChild(cell1);
    row.appendChild(cell2);
    row.appendChild(cell3);
    table.appendChild(row);
}