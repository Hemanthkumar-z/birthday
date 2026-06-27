   <script>
        // Data
        const questions = [
            "Have you ever started a match confidently and died in the first minute?",
            "Are you secretly the biggest noob in the guild? 🤣",
            "Have you ever said 'rush' and then stayed behind?",
            "Will you distribute diamonds to all guild members today?",
            "Have you ever stolen a teammate's loot?",
            "Have you ever used a teammate as bait?"
        ];

        const noMessages = [
            "Are you sure? 🤨",
            "Think again 😂",
            "The guild knows the truth 😏",
            "Nice try 🤣",
            "Stop lying to yourself! 🤥",
            "We have replays! 🎥",
            "Just click YES already... 🙄"
        ];

        // State Variables
        let currentQuestion = 0;
        let noClicks = 0;
        let yesScale = 1;
        let noScale = 1;
        let lotusTaps = 0;
        let isMusicPlaying = false;

        // DOM Elements
        const questionText = document.getElementById("question-text");
        const funnyText = document.getElementById("funny-text");
        const btnYes = document.getElementById("btn-yes");
        const btnNo = document.getElementById("btn-no");
        const qCard = document.getElementById("q-card");
        const checkOverlay = document.getElementById("check-overlay");
        
        // Initialize First Question
        questionText.innerText = questions[currentQuestion];

        // Music Toggle Function
        function toggleMusic() {
            const audio = document.getElementById('bg-music');
            const btn = document.getElementById('music-toggle');
            if (isMusicPlaying) {
                audio.pause();
                btn.innerText = "🔇";
            } else {
                audio.play().catch(e => console.log("Audio play blocked by browser"));
                btn.innerText = "🔊";
            }
            isMusicPlaying = !isMusicPlaying;
        }

        // Logic: NO Click
        function handleNo() {
            noClicks++;
            
            // Animation
            qCard.classList.remove("shake");
            void qCard.offsetWidth; // Trigger reflow
            qCard.classList.add("shake");

            // Shrink NO, Grow YES
            noScale *= 0.8;
            yesScale += 0.15;
            
            btnNo.style.transform = `scale(${noScale})`;
            btnYes.style.transform = `scale(${yesScale})`;

            // Funny Messages
            const randomMsg = noMessages[Math.floor(Math.random() * noMessages.length)];
            funnyText.innerText = randomMsg;

            // Hide NO button if clicked too much
            if (noClicks >= 6) {
                btnNo.style.display = "none";
                funnyText.innerText = "No escape now! 😆";
            }
        }

        // Logic: YES Click
        function handleYes() {
            // Show Green Check
            checkOverlay.classList.add("active");
            
            setTimeout(() => {
                checkOverlay.classList.remove("active");
                currentQuestion++;
                
                if (currentQuestion < questions.length) {
                    // Next Question setup
                    questionText.innerText = questions[currentQuestion];
                    // Reset buttons
                    noClicks = 0;
                    yesScale = 1;
                    noScale = 1;
                    btnYes.style.transform = "scale(1)";
                    btnNo.style.transform = "scale(1)";
                    btnNo.style.display = "block";
                    funnyText.innerText = "";
                } else {
                    // Start Completion Sequence
                    startCompletionSequence();
                }
            }, 800); // Wait for checkmark animation
        }

        function startCompletionSequence() {
            const qScreen = document.getElementById("question-screen");
            const lotusScreen = document.getElementById("lotus-screen");
            
            qScreen.classList.remove("active");
            setTimeout(() => {
                qScreen.style.display = "none";
                lotusScreen.style.display = "flex";
                // Slight delay before fading in
                setTimeout(() => {
                    lotusScreen.classList.add("active");
                    createLotusPetals();
                }, 50);
            }, 1000);
        }

        function createLotusPetals() {
            const lotus = document.getElementById("lotus");
            // Create 7 wrappers with petals
            for(let i=1; i<=7; i++) {
                const wrapper = document.createElement("div");
                wrapper.className = `petal-wrapper pw-${i}`;
                wrapper.id = `pw-${i}`;
                
                const petal = document.createElement("div");
                petal.className = "petal";
                
                wrapper.appendChild(petal);
                lotus.appendChild(wrapper);
            }
        }

        function tapLotus(event) {
            lotusTaps++;
            createSparkles(event);

            const pw1 = document.getElementById("pw-1"); // Center
            const pw2 = document.getElementById("pw-2"); // L1
            const pw3 = document.getElementById("pw-3"); // R1
            const pw4 = document.getElementById("pw-4"); // L2
            const pw5 = document.getElementById("pw-5"); // R2
            const pw6 = document.getElementById("pw-6"); // L3
            const pw7 = document.getElementById("pw-7"); // R3

            if (lotusTaps === 1) {
                // Bud slightly opens
                pw2.style.transform = "rotate(-20deg) scale(0.6)";
                pw3.style.transform = "rotate(20deg) scale(0.6)";
                pw1.style.transform = "rotate(0deg) scale(0.7)";
            } else if (lotusTaps === 2) {
                // More petals
                pw4.style.transform = "rotate(-40deg) scale(0.7)";
                pw5.style.transform = "rotate(40deg) scale(0.7)";
                pw2.style.transform = "rotate(-25deg) scale(0.8)";
                pw3.style.transform = "rotate(25deg) scale(0.8)";
            } else if (lotusTaps === 3) {
                // Half open
                pw6.style.transform = "rotate(-60deg) scale(0.7)";
                pw7.style.transform = "rotate(60deg) scale(0.7)";
                pw4.style.transform = "rotate(-45deg) scale(0.8)";
                pw5.style.transform = "rotate(45deg) scale(0.8)";
                pw1.style.transform = "rotate(0deg) scale(0.9)";
            } else if (lotusTaps === 4) {
                // Almost fully open
                pw6.style.transform = "rotate(-75deg) scale(0.8)";
                pw7.style.transform = "rotate(75deg) scale(0.8)";
                pw2.style.transform = "rotate(-30deg) scale(1)";
                pw3.style.transform = "rotate(30deg) scale(1)";
            } else if (lotusTaps === 5) {
                // Fully blooms
                pw6.style.transform = "rotate(-90deg) scale(0.9)";
                pw7.style.transform = "rotate(90deg) scale(0.9)";
                pw4.style.transform = "rotate(-60deg) scale(1)";
                pw5.style.transform = "rotate(60deg) scale(1)";
                pw1.style.transform = "rotate(0deg) scale(1.1)";

                document.body.classList.add("magical-bg");
                document.getElementById("lotus-text").innerText = "✨ Magic Unlocked! ✨";

                setTimeout(() => {
                    revealFinalMessage();
                }, 1500);
            }
        }

        function createSparkles(e) {
            const lotus = document.getElementById("lotus");
            const rect = lotus.getBoundingClientRect();
            const offsetX = e ? e.clientX - rect.left : rect.width / 2;
            const offsetY = e ? e.clientY - rect.top : rect.height / 2;

            for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement("div");
                sparkle.className = "sparkle";
                sparkle.style.width = Math.random() * 8 + 4 + "px";
                sparkle.style.height = sparkle.style.width;
                sparkle.style.left = `${Math.min(Math.max(offsetX + (Math.random() - 0.5) * 80, 0), rect.width)}px`;
                sparkle.style.top = `${Math.min(Math.max(offsetY + (Math.random() - 0.5) * 80, 0), rect.height)}px`;
                lotus.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 1000);
            }
        }

        function revealFinalMessage() {
            const lotusScreen = document.getElementById("lotus-screen");
            const finalScreen = document.getElementById("final-screen");

            lotusScreen.classList.remove("active");
            setTimeout(() => {
                lotusScreen.style.display = "none";
                finalScreen.style.display = "flex";

                setTimeout(() => {
                    finalScreen.classList.add("active");
                    fireConfetti();
                    startFloatingPetals();
                }, 5);
            }, 300);
        }

        function fireConfetti() {
            if (typeof confetti !== "function") return;
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.3 }
            });
            confetti({
                particleCount: 60,
                spread: 90,
                origin: { x: 0.25, y: 0.2 }
            });
            confetti({
                particleCount: 60,
                spread: 90,
                origin: { x: 0.75, y: 0.2 }
            });
        }

        function startFloatingPetals() {
            const body = document.body;
            for (let i = 0; i < 6; i++) {
                const petal = document.createElement("div");
                petal.className = "floating-petal";
                petal.style.width = `${Math.random() * 18 + 12}px`;
                petal.style.height = `${Math.random() * 20 + 14}px`;
                petal.style.left = `${Math.random() * 90 + 5}%`;
                petal.style.animationDuration = `${Math.random() * 5 + 6}s`;
                petal.style.animationDelay = `${Math.random() * 3}s`;
                petal.style.transform = `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.7 + 0.6})`;
                body.appendChild(petal);

                setTimeout(() => petal.remove(), 12000);
            }
        }
    </script>