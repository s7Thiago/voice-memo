export default class Controller {

    constructor({ view, media, recorder }) {
        this.view = view;
        this.media = media;
        this.recorder = recorder;
    }

    static initialize(dependencies) {
        const instance = new Controller(dependencies);

        return instance._init();
    }

    _init() {
        this.view.configureStartRecordingButton(this.onStartRecording.bind(this));
        this.view.configureStopRecordingButton(this.onStopRecording.bind(this));
    }

    async onStartRecording() {
        console.log('iniciou a gravação');
        const audioStream = await this.media.getAudio();
        this.recorder.startRecording(audioStream);
    }
    async onStopRecording() {
        console.log('A gravação parou!');
        this.recorder.stopRecording();

        // Como o processo de pegar a url completa demora alguns milissegundos para ser
        // completado, foi adicionada esta espera para que a chamada de stopRecording()
        // ocorra obrigatoriamente antes desta chamada demorada dentro do setTimeOut();
        setTimeout(() => {
            const audioUrl = this.recorder.getRecordingUrl();
            this.view.playAudio(audioUrl);
        });

    }

}

