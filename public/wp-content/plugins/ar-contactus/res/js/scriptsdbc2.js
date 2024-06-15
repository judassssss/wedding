function arCuGetCookie(cookieName){
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return 0;
};
function arCuCreateCookie(name, value, days){
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
};
function arCuShowMessage(index){
    if (arCuPromptClosed){
        return false;
    }
    if (typeof arCuMessages[index] !== 'undefined'){
        contactUs.showPromptTyping();

        _arCuTimeOut = setTimeout(function(){
            if (arCuPromptClosed){
                return false;
            }
            contactUs.showPrompt({
                content: arCuMessages[index]
            });
            index ++;
            _arCuTimeOut = setTimeout(function(){
                if (arCuPromptClosed){
                    return false;
                }
                arCuShowMessage(index);
            }, arCuMessageTime);
        }, arCuTypingTime);
    }else{
        if (arCuCloseLastMessage){
            contactUs.hidePrompt();
        }
        if (arCuLoop){
            arCuShowMessage(0);
        }
    }
};
function arCuShowMessages(){
    setTimeout(function(){
        clearTimeout(_arCuTimeOut);
        arCuShowMessage(0);
    }, arCuDelayFirst);
}
function arCuShowWelcomeMessage(index){
    if (typeof arWelcomeMessages[index] !== 'undefined'){
        contactUs.showWellcomeTyping();

        _arCuWelcomeTimeOut = setTimeout(function(){
            contactUs.showWellcomeMessage({
                content: arWelcomeMessages[index]
            });
            index ++;
            _arCuWelcomeTimeOut = setTimeout(function(){
                arCuShowWelcomeMessage(index);
            }, arWelcomeMessageTime);
        }, arWelcomeTypingTime);
    }else{

    }
};
function arCuShowWellcomeMessages(){
    setTimeout(function(){
        clearTimeout(_arCuWelcomeTimeOut);
        arCuShowWelcomeMessage(0);
    }, arWelcomeDelayFirst);
}
window.addEventListener('load', function(){
    if (document.getElementById('arcontactus-storefront-btn')) {
        document.getElementById('arcontactus-storefront-btn').click(function(e){
            e.preventDefault();
            setTimeout(function(){
                contactUs.openMenu();
            }, 200);
        });
    }
    document.addEventListener('click', function(e) {
        if (!e.target) {
            return false;
        }
        const target = e.target;
        
        if (target.classList.contains('arcu-open-menu') || target.closest('.arcu-open-menu')) {
            e.preventDefault();
            e.stopPropagation();
            contactUs.hideForm();
            setTimeout(function(){
                contactUs.openMenu();
            }, 200);
            return false;
        }
        
        if (target.classList.contains('arcu-toggle-menu') || target.closest('.arcu-toggle-menu')) {
            e.preventDefault();
            e.stopPropagation();
            contactUs.hideForm();
            setTimeout(function(){
                contactUs.toggleMenu();
            }, 200);
            return false;
        }
        
        if (target.classList.contains('arcu-open-callback') || target.closest('.arcu-open-callback')) {
            e.preventDefault();
            e.stopPropagation();
            arCuPromptClosed = true;
            contactUs.hidePrompt();
            contactUs.hideForm();
            contactUs.closeMenu();
            setTimeout(function(){
                contactUs.showForm('callback');
            }, 200);
            return false;
        }
        
        if (target.classList.contains('arcu-open-email') || target.closest('.arcu-open-email')) {
            e.preventDefault();
            e.stopPropagation();
            arCuPromptClosed = true;
            contactUs.hidePrompt();
            contactUs.hideForm();
            contactUs.closeMenu();
            setTimeout(function(){
                contactUs.showForm('email');
            }, 200);
            return false;
        }
        
        if (target.classList.contains('arcu-open-form') || target.closest('.arcu-open-form')) {
            var formId = null;
            if (target.classList.contains('arcu-open-form')) {
                formId = target.getAttribute('data-form-id');
            } else if (target.closest('.arcu-open-form')) {
                formId = target.closest('.arcu-open-form').getAttribute('data-form-id');
            }
            
            if (formId === null) {
                return false;
            }
            
            e.preventDefault();
            e.stopPropagation();
            arCuPromptClosed = true;
            contactUs.hidePrompt();
            contactUs.hideForm();
            contactUs.closeMenu();
            setTimeout(function(){
                contactUs.showForm(formId);
            }, 150);
            return false;
        }
    });
});