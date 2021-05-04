export default class Recorder {
    constructor() {

        //  Usando o tipo de audio mais compatível do momento (webm)
        // Usando o codec de audio opus
        this.audioType = 'audio/webm;codec=opus'
        this.mediaRecorder = {};

        // Onde os dados gravados são guardados para serem reproduzidos posteriormente,
        //  uma vez que a gravação foi iniciada
        this.recordedBlobs = [];

    }

    // Verifica se o browser que está rodando a aplicação é compatível
    _setup() {
        const options = { mimeType: this.audioType };
        const isSupported = MediaRecorder.isTypeSupported(options.mimeType);

        if (!isSupported) {
            const msg = `the codec: ${options.mimeType} isn't supported!!!`
            alert(msg);

            throw new Error(msg);
        }

        return options;
    }

    // Recebe a stream do audio do usuário e realiza a gravação
    startRecording(stream) {
        const options = this._setup();
        this.mediaRecorder = new MediaRecorder(stream, options);

        this.mediaRecorder.onstop = (event) => {
            console.log('Recorded blobs', this.recordedBlobs);
        }

        // Verificando se há dados para gravar
        this.mediaRecorder.ondataavailable = (event) => {
            if (!event.data || !event.data.size) return;

            // Se houverem dados, adiciona ao array
            this.recordedBlobs.push(event.data);
        }

        this.mediaRecorder.start(); // Inicializa uma gravação
        console.log('Media recorded started: ', this.mediaRecorder);
    }

    async stopRecording() {

        // Se por algum motive a gravação parou antes que o botão de parar fosse acionado
        // encerra esta função
        if (this.mediaRecorder.state === 'inactive') return;

        this.mediaRecorder.stop();
        console.log('Media recorded stopped');

    }


    // Pega a url dos dados gravados para posteriormente usar na reprodução dos mesmos
    getRecordingUrl() {
        const blob = new Blob(this.recordedBlobs, { type: this.audioType });
        return window.URL.createObjectURL(blob);
    }
}