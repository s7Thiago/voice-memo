export default class View {
    constructor() {
        this.btnStart = document.getElementById('btnStart');
        this.btnStop = document.getElementById('btnStop');
        this.audioElement = document.getElementById('audio');
    }

    onRecordClick(command) {
        return () => {
            command();
            // Esconde o elemento de audio
            this.toggleAudioElement({ visible: false });
        }
    }

    onStopRecordClick(command) {
        return () => {
            command();
        }
    }

    configureStartRecordingButton(command) {
        this.btnStart.addEventListener('click', this.onRecordClick(command));
    }

    configureStopRecordingButton(command) {
        this.btnStop.addEventListener('click', this.onStopRecordClick(command));
    }

    toggleAudioElement({ visible }) {
        const classList = this.audioElement.classList;
        visible ? classList.remove('hidden') : classList.add('hidden');
    }

    // Recebe uma url com o endereço do blob onde está o audio gravado e reproduz o mesmo
    playAudio(url) {
        // Pegando a referência para o elemento de audio
        const audio = this.audioElement;
        audio.src = url; // Atribuindo o caminho do blob para o elemento de audio
        audio.muted = false;
        this.toggleAudioElement({ visible: true });
        audio.addEventListener('loadedmetadata', _ => audio.play());
    }

} 