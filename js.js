function CrossText() {
    // --- Приватные переменные ---
    var self = this,
        input_field = document.querySelector('[contenteditable="true"]'),
        output = document.querySelector('.output'),
        button = document.querySelector('.button'),
        separator = '&#0822;',
        textParts = {};
    // --- Приватные методы ---
    function getRangeObject(win) {
        win = win || window;
        if (win.getSelection) {
            try {
                return win.getSelection().getRangeAt(0);
            } catch (e) {
                console.log('getSelection() вызвал ошибку');
            }
        } else {
            console.log('getSelection() не поддерживается');
        }
        return null;
    }

    function keydownListener(e) {
        if ((e.key == 'Q' || e.key == 'Й') && e.ctrlKey && e.shiftKey) {
            this.textPrepare();
        } else {
            // console.log(e.key);
        }
    }

    function init() {
        input_field.addEventListener('keydown', keydownListener);
        button.addEventListener('click', self.textPrepare);
        console.log(output);

    }
    // --- Публичные методы ---
    this.textOutput = function(text, elem) {
        output.textContent = text;
    }
    this.textProcess = function(text, separator) {
        if (text.length < 2) {
            text = text + separator;
        } else {
            text = text.split('').join(separator);
        }
        return text;
    }
    this.textPrepare = function() {
        output.textContent = '';
        textParts = {};
        var range = getRangeObject();
        if (range) {
            console.log(range);
            try {
                textParts.full = range.startContainer.nodeValue;
                textParts.selected = range.toString();
                textParts.before = textParts.full.substring(0, range.startOffset);
                textParts.after = textParts.full.substring(range.endOffset);
                textParts.processed = self.textProcess(textParts.selected, separator);
                textParts.new_full = textParts.before + textParts.processed + textParts.after;
            } catch (err) {
                console.log('Ошибка в textPrepare');
                console.dir(textParts);
            }
        } else {
            console.log('Сначала выделите текст');
        }
        console.dir(textParts);
        self.textOutput(textParts.new_full);
    }

    // --- Запуск ---
    init();
}

var crossText = new CrossText();