var tm = require('text-miner');

/* GET home page. */
exports.upload_get = function (req, res, next) {
    res.render('index', { title: 'Vocabularize' });
};

// Handle POST.
exports.upload_post = function (req, res) {

    var upload = req.file;
    var text = upload.buffer.toString();
    var words = ["the", "fundamental"];

    var my_corpus = new tm.Corpus([]);
    my_corpus.addDoc(text);

    my_corpus.removeInterpunctuation();
    my_corpus.removeDigits();
    my_corpus.clean();
    my_corpus.removeInvalidCharacters();
    my_corpus.removeWords(tm.STOPWORDS.EN);
    my_corpus.removeWords(tm.STOPWORDS.DE);
    my_corpus.removeWords(words, true); //, case_insensitive = true (default = false)

    var terms = new tm.DocumentTermMatrix(my_corpus);
    var voc = terms.vocabulary;
    var adjustedVoc;
    for (i = 0; i < voc.length; i++) {

        if (voc[i].indexOf("(") > -1 || voc[i].indexOf(")") > -1) {
            voc.splice(i, 1);
            continue;
        }
        if (/^[a-zA-Z()]+$/.test(voc[i])) adjustedVoc += voc[i] + "\n";
    }

    res.render('index', { title: 'Vocabularize', output: adjustedVoc });
};