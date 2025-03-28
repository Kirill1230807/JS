class Lamp {
    constructor() {
        this.state = false;
        this.type = 0;
        this.timer = null;
        this.lampElement = document.getElementById("lamp");
        this.toggleButton = document.getElementById("toggleBtn");
        this.changeTypeButton = document.getElementById("changeTypeBtn");
        this.init();
    }
    init() {
        this.toggleButton.addEventListener("click", () => this.toggle());
        this.changeTypeButton.addEventListener("click", () => this.changeType());
    }

    toggle() {
        this.state = !this.state;
        this.updateLamp();

        if (this.state && this.type === "led") {
            let brightness = prompt("Введіть яскравість від 0 до 100:", 50);
            brightness = Math.max(0, Math.min(100, Number(brightness) || 50));
            this.lampElement.style.opacity = brightness / 100;
        }
        else {
            this.lampElement.style.opacity = 1;
        }
        if (this.state) {
            this.resetTimer();
        }
    }
    changeType() {
        const types = ["normal", "led", "energy-saving"];
        let currentIndex = types.indexOf(this.type);
        this.type = types[(currentIndex + 1) % types.length];
        this.updateLamp();
    }
    updateLamp() {
        this.lampElement.className = `lamp ${this.type} ${this.state ? "on" : "off"}`;
        this.toggleButton.textContent = this.state ? "Виключити" : "Включити";
    }

    resetTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.state = false;
            this.updateLamp();
            alert("Лампочка вимкнулася через 5 хвилин, тому що нічого не робив.");
        }, 5 * 60 * 1000);
    }
}

document.addEventListener("DOMContentLoaded", () => new Lamp());