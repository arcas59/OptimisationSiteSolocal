window.customWidgetsFunctions["4a70e1a58eab4ec18244bf461b7487c4~353"] = function (element, data, api) {
        

    console.log("launch script");
    console.log(element);
    
    /*console.log(element.id);
    
    
    function IdNameWidget() {
        
         
        return "#"+element.id;
    }
    
    
    console.log( IdNameWidget());*/
    
    
    
    
    
    
    function IdNameWidget() {
        
         
        return "#"+element.id;
    }
    
    // Permet de résoudre un problème de connection de donnée avec les lien des boutons
    function url() {
        // si il n'y a pas de lien, pas besoin de faire notre procédure
        if(data.config.lienBoutonFlottant !== undefined) {
            // Sur l'éditeur, il y a un lien différent que la version normal
            if(data.inEditor) {
                if(data.config.lienBoutonFlottant.raw_url !== undefined)
                    $(idWidget+' .lienFlottant').attr('href', data.config.lienBoutonFlottant.raw_url);
                else
                    $(idWidget+' .lienFlottant').attr('href', data.config.lienBoutonFlottant);
            }
            else {
                if(data.config.lienBoutonFlottant.raw_url !== undefined)
                    $(idWidget+' .lienFlottant').attr('href', data.config.lienBoutonFlottant.href);
                else
                    $(idWidget+' .lienFlottant').attr('href', data.config.lienBoutonFlottant);
            }
        }
    }
    
    
    
    // Supprimer <p class='rteBlock' du data binding
    function DeleteRteBlock() {
        
    
        
        // On va parcourir la description pour chercher à supprimer la balise
        $(idWidget+' .container-text-slide').each(function(index, container) {
            // Lorsqu'on fait des retours à la ligne, le rteBlock se multiplie
            // alors on va devoir chercher tout les rteBlock et les remettre dans
            // un texte pour enfin le remettre à la balise d'origine
           
           if($(this).children().hasClass('rteBlock')){
            
           
            textTemporaire = "";
            $(container).children(idWidget+" .rteBlock").each(function(index2, rteBlock) {
                textTemporaire += $(rteBlock).html() + "<br>";
                $(rteBlock).remove();
            });
            $(container).children(idWidget+" .text-slider").html(textTemporaire);
            // l'image se met dans la balise p automatiquement donc on l'extrait
            if(data.config.estPersonnaliserTrait)
                $(container).find(".trait-bas-perso").appendTo(container);
            $(container).children("p:not(.text-slider)").remove();
        
           }
             
            
        });
        
        // Comme le rteBlock ne va pas sortir du h1, pas besoin de faire compliquer
        $(idWidget+' h1 .rteBlock').each(function() {
           textTemporaire = $(this).html();
           $(this).replaceWith(textTemporaire);
        });
    }
    
    function setTimer() {
        $(idWidget).attr('data-unique',unique);
        console.log("settimer "+ unique);
        
            clearInterval(idTimer);
        
            idTimer = setInterval(timer, parseInt(data.config.tempsAnimation) * 1000);
            console.log("setted "+unique);
       
    
    }
    
    function init() {
        createDot();
        if(data.config.estSlideAutomatique)
            setTimer();
        else
            clearInterval($(idWidget).data("timer"));
    }
    
    function timer() {
        console.log("loop "+ unique);
        if($(idWidget + '[data-unique='+unique+']').length>0){ 
            activeSlide();
            numSlider++;
            if (numSlider >= slider.length)
                numSlider = 0;
            activeSlide();
              console.log("chqnge " +unique);
        }else if (idTimer){
             clearInterval(idTimer);
             idTimer=false;
             console.log("cleaqred "+ unique);
        }
         console.log("loop fin");
    }
    
    function activeSlide() {
        if(slider.length>1){ /*VJ : si il n'y a qu'un slide inutile d'animer l'affichage d'un seul slide*/
        slider.eq(numSlider).toggleClass('masked');
        dot.eq(numSlider).toggleClass('active');
        
        majLayout();
        }
    }
    
    function createDot() {
        if(slider.length>1){ /*VJ : si il n'y a qu'un slide inutile de créer les points de navigation*/
            for(var i = 0; i < slider.length; i++){
                dot = $(document.createElement("span"));
                
                dot.addClass('dot');
                dot.data('data-indexdot', i);
                
                if (i === 0) {
                    dot.addClass('active');
                }
                else{
                    slider.eq(i).addClass('masked');
                }
                $(idWidget+" .controls").append(dot);
                dot = $(idWidget+' .dot');
                dot.eq(i).click(afficheSlide);
            }
        }
        
    }
    
    function afficheSlide() {
        
        var cible = $(this).data("data-indexdot"); 
        selectSlide(cible);
    
    }
    
    function selectSlide(cible) {
        // console.log(cible);
        
        majLayout();
        
        for(var i = 0; i < slider.length; i++){
            slider.eq(i).addClass('masked');
            dot.eq(i).removeClass('active');
        }
        
        if(data.config.estSlideAutomatique)
            setTimer();
        else
            clearInterval($(idWidget).data("timer"));
        slider.eq(cible).toggleClass('masked');
        dot.eq(cible).toggleClass('active');
        numSlider = cible;
    }
    
    function initLLayout() {
       
        
        // Va servir à savoir si les textes sont vides pour ensuite les gérer
        if (data.config.typeTitreFlottant === "h1"){
            aTextTitreFlottant = isset($(idWidget+" .text-titre-flottant h1"));
        } else if (data.config.typeTitreFlottant === "p"){
            aTextTitreFlottant = isset($(idWidget+" .text-titre-flottant p"));
        }
        //aTextTitreFlottant = isset($(idWidget+" .text-titre-flottant h1"));
        aTitreSlide = isset($(idWidget+" .titre-slide").eq(numSlider));
        aDescriptionSlide = isset($(idWidget+" .text-slider").eq(numSlider));
        
        hauteurBlocTexteSlide = $(idWidget+" .container-text").outerHeight(true);
        
        // si on a le titreFlottant qui est vide et qu'il y a un icone, on fait disparaitre
        // seulement le h1 sinon on fait disparaitre tout le titreFlottant pour éviter d'avoir
        // encore le fond
        if(!aTextTitreFlottant && (aIconeFlottant || aBoutonFlottant))
            $(idWidget+' .text-titre-flottant').css("display", "none");
        else if(!aTextTitreFlottant)
            $(idWidget+' .titre-flottant').css("display", "none");
        
        // Si le titre du slide est vide, on le fait disparaitre
        if(!aTitreSlide)
            $(idWidget+' .container-titre-slide').eq(numSlider).css("display", "none");
        
        // Si la description du slide est vide, on le fait disparaitre
        if(!aDescriptionSlide)
            $(idWidget+' .container-text-slide').eq(numSlider).css("display", "none");
        
        // En mobile, tous les éléments sont dans le bloc texte en position du layout Haut / Bas
        // Seulement si on a un icône cela ne reste inchangé de version ordinateur
        // la version ordinateur va avoir les 3 layout principal détaillé en dessous
        if(data.device==="mobile" || data.device==="tablet") {
            // Taille de l'image
            tailleImage = parseInt(data.config.tailleSliderMobile);
            // Hauteur de l'image
          
          if(data.device==="tablet"){
              
              hauteurImage = parseInt(data.config.hauteurSliderTab);
              
          }else{
            hauteurImage = parseInt(data.config.hauteurImageMobile);
          }
            
            // On reprend la forme du layout Haut / Bas pour la version mobile
            $(idWidget+" .slide").css("flex-direction", "column");
            $(idWidget+" .block-text").css("justify-content", "center");
            
            // Permet de garder l'image en haut et le texte en bas
            $(idWidget+" .container-image").css("order", "1");
            
            $(idWidget+" .container-controls").css("width", '100%');
            $(idWidget+" .container-controls").css("left", '0%');
            $(idWidget+" .container-controls").css("bottom", "5%");
            
            // Position de l'image avec le texte (l'image peut être en haut ou en bas)
            $(idWidget+" .block-text").css("align-items", 'flex-start');
            
            // Pour le layout 2 et 3 du layout centre qui ont le fondBloc sur le fond flottant en version ordinateur
            // Donc on enlève et on remet (pour éviter que sa se duplique) et s'il n'a pas la class, ça lui rajoutera.
            $(idWidget+" .block-text").removeClass("fondBloc");
            $(idWidget+" .block-text").addClass("fondBloc");
            
            // Control de la largeur
            $(idWidget+" .block-text").css("width", tailleImage+'%');
            $(idWidget+" .container-image").css("width", tailleImage+'%');
            
            /* Control de la hauteur */
            
            $(idWidget+" .container-image").css("height", hauteurImage+"px");
            
            // Explication de la méthode : On va procéder à un système d'adaptation
            // pour tout les layouts qui sont sur mobile en cherchant les éléments disponible
            // étant donné qu'ils auront tous le même layout (le layout Haut / Bas)
            
            espacementControlSlide = parseInt(data.config.espacementControlSlideMobile);
            tailleBloc = parseInt(data.config.largeurBlocTexteMobile) / 100;
            hauteurBloc = parseInt(data.config.hauteurBlocTexteMobile);
            
            hauteurContainer = 0;
            
            if(aTitreFlottant && aIconeFlottant) {
                // Si on a un icone flottant, rien change de la version ordinateur,
                // le titre flottant se place dans l'image
                if(data.device == "mobile")
                    tailleFlottant = parseInt(data.config.largeurTitreFlottantMobile) / 100;
                else
                    tailleFlottant = parseInt(data.config.largeurTitreFlottantTablette) / 100;
                
                hauteurFlottant = parseInt(data.config.hauteurTitreFlottantMobile);
                posVerticaleFlottant = parseInt(data.config.posVerticaleTitreFlottantMobile) / 100;
                posHorizontaleFlottant = parseInt(data.config.posHorizontaleTitreFlottantMobile) / 100;
                
                // la taille est en % mais décimal donc multiplie par la taille du conteneur au-dessus
                $(idWidget+" .titre-flottant").css("width", tailleFlottant * $(idWidget+" .container-image").outerWidth(true)+"px");
                $(idWidget+" .container-text").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                
                $(idWidget+" .titre-flottant").css("height", hauteurFlottant + $(idWidget+" .text-titre-flottant").outerHeight(true)
                + $(idWidget+" .titre-flottant img").outerHeight(true)+"px");
                $(idWidget+" .container-text").css("margin", hauteurBloc / 2+"px 0px");
                
                // On positionne le titre flottant
                modifierPositionBlocVerticale(posVerticaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                modifierPositionBlocHorizontale(posHorizontaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                
                $(idWidget+" .titre-flottant").css("background-color", "white");
                $(idWidget+" .text-titre-flottant").css("margin-top", "25px");
            }
            else if(aTitreFlottant && aBoutonFlottant) {
                
                
            if(data.device == "mobile")
                    tailleFlottant = parseInt(data.config.largeurTitreFlottantMobile) / 100;
                else
                    tailleFlottant = parseInt(data.config.largeurTitreFlottantTablette) / 100;
                
                hauteurFlottant = parseInt(data.config.hauteurTitreFlottantMobile);
                posVerticaleFlottant = parseInt(data.config.posVerticaleTitreFlottantHautBasLayout2) / 100;
                posHorizontaleFlottant = parseInt(data.config.posHorizontaleTitreFlottantHautBasLayout2) / 100;
                
                 // la taille est en % mais décimal donc multiplie par la taille du conteneur au-dessus
                $(idWidget+" .titre-flottant").css("width", tailleFlottant * $(idWidget+" .container-image").outerWidth(true)+"px");
                
                if (data.device==="tablet") {
                    //do something if mobile
                    $(idWidget+" .titre-flottant").css("width", "auto");
                }
                
                $(idWidget+" .container-text").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                
                $(idWidget+" .titre-flottant").css("height", hauteurFlottant + $(idWidget+" .text-titre-flottant").outerHeight(true)
                + $(idWidget+" .titre-flottant img").outerHeight(true)+"px");
                $(idWidget+" .container-text").css("margin", hauteurBloc / 2+"px 0px");
                
                // On positionne le titre flottant
                modifierPositionBlocVerticale(posVerticaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                modifierPositionBlocHorizontale(posHorizontaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                
                    modifierPositionBlocVerticale(posVerticaleFlottant, $(idWidget+" .lienFlottant"), $(idWidget+" .container-image"));
                modifierPositionBlocHorizontale(posHorizontaleFlottant, $(idWidget+" .lienFlottant"), $(idWidget+" .container-image"));
                
              
                $(idWidget+" .text-titre-flottant").css("margin-top", "25px");
                
                $(idWidget+' .lienFlottant').css("top", $(idWidget+" .titre-flottant").outerHeight(true) + parseInt($(idWidget+" .titre-flottant").css("top"))+"px");
               
               hauteurBlocTitreFlottant = $(idWidget+" .titre-flottant").outerHeight(true);
                
                
            }
            else if(aTitreFlottant) {
                // On a un titre flottant, après on a le texte (exemple : le layout 1 du layout Haut / Bas)
                
                // Control du largeur
                $(idWidget+" .titre-flottant").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                
                
                
                $(idWidget+" .container-text").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                
                // Control du hauteur
                $(idWidget+" .titre-flottant").css("margin-top", hauteurBloc / 2+"px");
                $(idWidget+" .container-text").css("margin", hauteurBloc / 2+"px 0px"); //VJ VJ VJ ajout margin top initialement margin-bottom
                
                // On centre juste en horizontal
                modifierPositionBlocHorizontale(0.5, $(idWidget+" .titre-flottant"), $(idWidget+" .container"));
                
                // on le place en dessous de l'Image
                hauteurBlocTitreFlottant = $(idWidget+" .titre-flottant").outerHeight(true); 
                
                if(data.config.posTitreFlottant === "image"){ 
                    $(idWidget+' .titre-flottant').css("top", ((hauteurImage/2)-(hauteurBlocTitreFlottant/2)) +"px"); //VJ VJ VJ Centrer en hauteur pour le titre flottant sur tablet et mobile
                }else if(data.config.posTitreFlottant === "texte"){
                    $(idWidget+' .titre-flottant').css("top", hauteurImage+"px"); 
                    $(idWidget+' .container-text').css("top", $(idWidget+" .titre-flottant").outerHeight(true)+"px"); 
                }
                
                
                
               
                
                
            }
            else {
                // Control de la largeur
                $(idWidget+" .container-text").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                
                // Control de la hauteur
                $(idWidget+" .container-text").css("margin", hauteurBloc / 2+"px 0px");
            }
            
            // On va maintenant définir la hauteur du container et du slide
            // manuellement pour qu'il s'adapte en fonction des éléments qu'il y a
            // étant donné qu'il a une hauteur de base, il ne s'adapte pas automatiquement
            
            // On aura toujours l'image et le navigateur de slide, même si le texte dans le slider peut-être vide
            // On doit prendre le maximum.
            hauteurContainer += hauteurImage + maxOuterHeight($(idWidget+" .container-text"), true) + espacementControlSlide;
            
            // On rajoute la hauteur du titre flotant sauf s'il a une icône flottant
            // son affichage reste normal dans ce cas et donc il sera dans l'image
            if(aTitreFlottant && !aIconeFlottant)
                if(data.config.posTitreFlottant === "image"){ 
                    
                }else if(data.config.posTitreFlottant === "texte"){
                    hauteurContainer += hauteurBlocTitreFlottant;  
                }
            
               
            
            // Si il y a un bouton, on prend sa hauteur
            if(aBoutonFlottant)
                hauteurContainer += $(idWidget+" .boutonFlottant").outerHeight(true);
            
            // On fait la différence de la hauteur du container avec celle de l'image
            // pour trouver la hauteur du bloc text (si on prend plus, il va
            // commencer à grignoter la hauteur de l'image)
            hauteurBlocTexte = hauteurContainer - hauteurImage;
            
            // On modifie la hauteur le container et les slides pour envelopper
            // l'image, le texte et le navigateur de slide
            $(idWidget+" .container").css("height", hauteurContainer+"px");
            $(idWidget+" .slide").css("height", hauteurContainer+"px");
            $(idWidget+" .block-text").css("height", hauteurBlocTexte+"px");
        }
        else {
            
           marginIconeFlottant =parseInt(data.config.marginTopIcone);
           //console.log(marginIconeFlottant);
           
        $(idWidget+" .iconeFlottant").css("margin-top",+marginIconeFlottant);
            
            // On sélectionne le layout
            if(data.config.selecteurLayout==="layoutGaucheDroite"){
                // Variable de la largeur
                tailleBlocTexte = parseInt(data.config.tailleBlocTexteGaucheDroite); // En %
                tailleImage = 100 - parseInt(data.config.tailleBlocTexteGaucheDroite); // En %
                widthContainer = parseInt(data.config.tailleSliderGaucheDroite); // En px
                // Variable de la hauteur
                hauteurImage = parseInt(data.config.hauteurSliderGaucheDroite);
                
                // Control de la largeur
                $(idWidget+" .container").css("width", widthContainer+"%");
                $(idWidget+" .container-controls").css("width", tailleBlocTexte+'%');
                $(idWidget+" .block-text").css("width", tailleBlocTexte+'%');
                
                // Control de la hauteur
                $(idWidget+" .container").css("height", hauteurImage+"px");
                $(idWidget+" .slide").css("height", hauteurImage+"px");
                $(idWidget+" .container-image").css("height", hauteurImage+"px");
                
                // On sélectionne le layout secondaire
                switch(data.config.selecteurLayoutGaucheDroite) {
                    case "layout1":
                        // On va mettre en place une relativité entre le Titre Flottant et le Texte du Slider
                        
                        tailleBloc = $(idWidget+" .container").outerWidth(true) * (tailleBlocTexte / 100);
                        posVerticaleBloc = parseInt(data.config.posVerticaleBlocTexteGaucheDroiteLayout1) / 100;
                        posHorizontaleBloc = 0.5;
                        
                        // Une légère opacité pour montrer que l'image passe derrière le bloc texte
                        $(idWidget+" .fondBloc").css("background-color", "rgba(228,224,221,0.8)");
                        
                        // On le fait flotter pour mettre l'image derrière
                        $(idWidget+" .block-text").css("position", "absolute");
                        $(idWidget+" .container-text").css("position", "absolute");
                        
                        // l'image prendra la taille du conteneur et va se mettre en arrière plan
                        $(idWidget+" .container-image").css("width", "100%");
                        
                        // Control de la largeur
                        $(idWidget+" .container-text").css("width", tailleBloc+"px");
                        $(idWidget+" .titre-flottant").css("width", tailleBloc+"px");
                        
                        // Permet d'avoir une relativité entre le titre flottant et le texte
                        modifierPositionRelativeEntreBlocVerticale(posVerticaleBloc, $(idWidget+" .titre-flottant"),
                        $(idWidget+" .container-text").eq(numSlider), $(idWidget+" .block-text"));
                        
                        // Positionnement horizontale
                        modifierPositionBlocHorizontale(posHorizontaleBloc, $(idWidget+" .titre-flottant"), $(idWidget+" .block-text"));
                        
                        break;
                    default:
                        // Control de la largeur
                        $(idWidget+" .container-image").css("width", tailleImage+'%');
                }
            }
            if(data.config.selecteurLayout==="layoutHautBas") {
                tailleImage = parseInt(data.config.tailleSliderHautBas);
                hauteurImage = parseInt(data.config.hauteurImageHautBas);
                espacementControlSlide = parseInt(data.config.espacementControlSlide);
                
                $(idWidget+" .slide").css("flex-direction", "column");
                $(idWidget+" .block-text").css("justify-content", "center");
                
                $(idWidget+" .container-controls").css("width", '100%');
                
                // Control de la largeur
                $(idWidget+" .block-text").css("width", tailleImage+'%');
                $(idWidget+" .container-image").css("width", tailleImage+'%');
                
                $(idWidget+" .container-image").css("height", hauteurImage+"px");
                
                tailleBloc = parseInt(data.config.largeurBlocTexteHautBas) / 100;
                hauteurBloc = parseInt(data.config.hauteurBlocTexteHautBas);
                
                hauteurContainer = 0;
                
                switch(data.config.selecteurLayoutHautBas) {
                    case "layout1":
                        /* Avec un titre flottant */
                        
                        tailleFlottant = parseInt(data.config.largeurTitreFlottantHautBasLayout1) / 100;
                        hauteurFlottant = parseInt(data.config.hauteurTitreFlottantHautBasLayout1);
                        posVerticaleFlottant = parseInt(data.config.posVerticaleTitreFlottantHautBasLayout1) / 100;
                        posHorizontaleFlottant = parseInt(data.config.posHorizontaleTitreFlottantHautBasLayout1) / 100;
                        
                        // Control de la largeur
                        $(idWidget+" .container-text").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                        
                        // Control de la hauteur
                        $(idWidget+" .container-text").css("margin", hauteurBloc / 2+"px 0px");
                        
                        $(idWidget+" .titre-flottant").css("width", tailleFlottant * $(idWidget+" .container-image").outerWidth(true)+"px");
                        $(idWidget+" .titre-flottant").css("height", hauteurFlottant + $(idWidget+" .text-titre-flottant").outerHeight(true) +"px");
                        
                        // Positionnement verticale
                        modifierPositionBlocVerticale(posVerticaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                        
                        // Positionnement horizontale
                        modifierPositionBlocHorizontale(posHorizontaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                        
                        $(idWidget+" .titre-flottant").css("background-color", "rgba(255, 255, 255, 0.6)");
                        
                        if(data.config.positionImage2 == "img-bas")
                            $(idWidget+" .titre-flottant").css("top", hauteurBlocTexte + $(idWidget+" .titre-flottant").position().top+"px");
                        
                        // Réglage de l'ombre s'il est activé
                        if(data.config.ombreBlocFlottant)
                            $(idWidget+" .titre-flottant").css("box-shadow", "0px 0px "+data.config.flouOmbre+"px "+data.config.etalementOmbre+"px");
                        break;
                    case "layout2":
                        /* Avec un titre flottant et un bouton */
                        
                        tailleFlottant = parseInt(data.config.largeurTitreFlottantHautBasLayout2) / 100;
                        hauteurFlottant = parseInt(data.config.hauteurTitreFlottantHautBasLayout2);
                        posVerticaleFlottant = parseInt(data.config.posVerticaleTitreFlottantHautBasLayout2) / 100;
                        posHorizontaleFlottant = parseInt(data.config.posHorizontaleTitreFlottantHautBasLayout2) / 100;
                        
                        // Control de la largeur
                        $(idWidget+" .container-text").css("width", tailleBloc * $(idWidget+" .block-text").eq(numSlider).outerWidth(true)+"px");
                        
                        // Control de la hauteur
                        $(idWidget+" .container-text").css("margin", hauteurBloc / 2+"px 0px");
                        
                        $(idWidget+" .titre-flottant").css("width", tailleFlottant * $(idWidget+" .container-image").outerWidth(true)+"px");
                        
                        $(idWidget+" .titre-flottant").css("height", hauteurFlottant + $(idWidget+" .text-titre-flottant").outerHeight(true) +"px");
                        
                        $(idWidget+" .lienFlottant").css("width", tailleFlottant * $(idWidget+" .container-image").outerWidth(true)+"px");
                        $(idWidget+" .lienFlottant").css("top", $(idWidget+" .lienFlottant").outerHeight(true) / 2+"px");
                        
                        modifierPositionBlocVerticale(posVerticaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                        modifierPositionBlocHorizontale(posHorizontaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                        
                        // On centre le bouton horizontalement uniquement
                        modifierPositionBlocHorizontale(posHorizontaleFlottant, $(idWidget+" .lienFlottant"), $(idWidget+" .container-image"));
                        
                        $(idWidget+" .lienFlottant").css("top", $(idWidget+" .titre-flottant").position().top + $(idWidget+" .titre-flottant").outerHeight(true)
                        - $(idWidget+" .lienFlottant").outerHeight(true) / 2+"px");
                        
                        $(idWidget+" .titre-flottant").css("background-color", "rgba(255, 255, 255, 0.6)");
                        
                        if(data.config.positionImage2 == "img-bas")
                            $(idWidget+" .titre-flottant").css("top", hauteurBlocTexte + $(idWidget+" .titre-flottant").position().top+"px");
                        
                        // Réglage de l'ombre s'il est activé
                        if(data.config.ombreBlocFlottant)
                            $(idWidget+" .titre-flottant").css("box-shadow", "0px 0px "+data.config.flouOmbre+"px "+data.config.etalementOmbre+"px");
                        break;
                    case "layout3":
                        /* Avec un titre flottant et une icone */
                        
                        tailleFlottant = parseInt(data.config.largeurTitreFlottantHautBasLayout3) / 100;
                        hauteurFlottant = parseInt(data.config.hauteurTitreFlottantHautBasLayout3);
                        posVerticaleFlottant = parseInt(data.config.posVerticaleTitreFlottantHautBasLayout3) / 100;
                        posHorizontaleFlottant = parseInt(data.config.posHorizontaleTitreFlottantHautBasLayout3) / 100;
                        
                        // Control de la largeur
                        $(idWidget+" .container-text").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                        
                        $(idWidget+" .titre-flottant img").css("width", "75%");
                        $(idWidget+" .titre-flottant img").css("height", "auto");
                        
                        // Control de la hauteur
                        $(idWidget+" .container-text").css("margin", hauteurBloc / 2+"px 0px");
                        
                        $(idWidget+" .titre-flottant").css("width", tailleFlottant * $(idWidget+" .container-image").outerWidth(true)+"px");
                        //modifs cyril supr de [numSlider].getBoundingClientRect() mais PB
                        // $(idWidget+" .titre-flottant").css("height", hauteurFlottant + $(idWidget+" .text-titre-flottant").outerHeight(true) + $(idWidget+" .iconeFlottant")[numSlider].getBoundingClientRect().height+"px");
                        $(idWidget+" .titre-flottant").css("height", hauteurFlottant + $(idWidget+" .text-titre-flottant").outerHeight(true) + $(idWidget+" .iconeFlottant").eq(numSlider).height+"px");
                        
                        modifierPositionBlocVerticale(posVerticaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                        modifierPositionBlocHorizontale(posHorizontaleFlottant, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                        
                        $(idWidget+" .titre-flottant").css("background-color", "rgba(255, 255, 255)");
                        $(idWidget+" .text-titre-flottant").css("margin-top", "25px");
                        
                        if(data.config.positionImage2 == "img-bas")
                            $(idWidget+" .titre-flottant").css("top", hauteurBlocTexte + $(idWidget+" .titre-flottant").position().top+"px");
                        
                        // Réglage de l'ombre s'il est activé
                        if(data.config.ombreBlocFlottant)
                            $(idWidget+" .titre-flottant").css("box-shadow", "0px 0px "+data.config.flouOmbre+"px "+data.config.etalementOmbre+"px");
                        break;
                    case "layout4":
                        // Ce layout reprend la même version que le mobile avec un titre flottant
                        
                        // Control de la largeur
                        $(idWidget+" .titre-flottant").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                        $(idWidget+" .container-text").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                        
                        // Control de la hauteur
                        $(idWidget+" .titre-flottant").css("margin-top", hauteurBloc / 2+"px");
                        $(idWidget+" .container-text").css("margin-bottom", hauteurBloc / 2+"px");
                        
                        // On place le titre flottant sous l'image
                        $(idWidget+' .titre-flottant').css("top", hauteurImage+"px");
                        // on le place en dessous du Titre Flottant
                        $(idWidget+' .container-text').css("top", $(idWidget+" .titre-flottant").outerHeight(true)+"px");
                        
                        // On centre le titre flottant en horizontal
                        modifierPositionBlocHorizontale(0.5, $(idWidget+" .titre-flottant"), $(idWidget+" .container"));
                        
                        hauteurContainer += $(idWidget+" .titre-flottant").outerHeight(true);
                        
                        // On prend la hauteur du texte avec sa margin (qui englobe tout le titre flottant) et l'espacement en plus pour
                        // pour le navigateur de slide pour avoir la hauteur du container
                        break;
                    default:
                        // Control de la largeur
                        $(idWidget+" .container-text").css("width", tailleBloc * $(idWidget+" .block-text").outerWidth(true)+"px");
                        
                        // Control de la hauteur
                        $(idWidget+" .container-text").css("margin", hauteurBloc / 2+"px 0px");
                }
                
                hauteurContainer += hauteurImage + maxOuterHeight($(idWidget+" .container-text"), true) + espacementControlSlide;
                hauteurBlocTexte = hauteurContainer - hauteurImage;
                
                // On applique la hauteur du container, du slide et le bloc texte
                $(idWidget+" .container").css("height", hauteurContainer+"px");
                $(idWidget+" .slide").css("height", hauteurContainer+"px");
                $(idWidget+" .block-text").css("height", hauteurBlocTexte+"px");
            }
            if(data.config.selecteurLayout==="layoutCentre") {
                
                // Variable de la largeur
                tailleImage = data.config.tailleSliderCentre;
                // Variable de la hauteur
                hauteurImage = data.config.hauteurSliderCentre;
                
                // Réglage spécifique
                $(idWidget+" .block-text").css("position", "absolute");
                $(idWidget+" .slide").css("justify-content", 'center');
                
                // Control de la largeur
                $(idWidget+" .container-controls").css("width", '100%');
                $(idWidget+" .container-image").css("width", tailleImage+'%');
                
                // Control de la hauteur
                $(idWidget+" .container").css("height", hauteurImage+"px");
                $(idWidget+" .slide").css("height", hauteurImage+"px");
                $(idWidget+" .container-image").css("height", hauteurImage+"px");
                
                // Si le bloc texte est vide, on n'affiche pas le bloc
                if(!aTitreSlide && !aDescriptionSlide) {
                    $(idWidget+" .block-text").eq(numSlider).css("display", "none");
                    hauteurBlocTexteSlide = 0;
                }
                
                tailleBloc = parseInt(data.config.largeurBlocTexteCentre) / 100;
                hauteurBloc = parseInt(data.config.hauteurBlocTexteCentre);
                posVerticaleBloc = parseInt(data.config.posVerticaleBlocTexteCentre) / 100;
                posHorizontaleBloc = parseInt(data.config.posHorizontaleBlocTexteCentre) / 100;
                
                if ((posVerticaleBloc*100)>100){ // VJ le parametre position vertical passe de 0-100 à 0-150 pour un chevauchement de la zone texte sur le slide avec une condition si > 100
                    $(idWidget+" .container").css("margin-bottom",(((posVerticaleBloc*100) - 100)/100 * ($(idWidget+" .container-image").outerHeight(true)))+"px") //VJ on ajoute jusqu'à 50% de marge bottom au container du slider
                    $(idWidget+" .container-controls").css("bottom","-"+(((posVerticaleBloc*100) - 100)/100 * ($(idWidget+" .container-image").outerHeight(true)) - 10)+"px") // VJ on positionne les points de navigation en position bottom
                }
                
                // On prédéfini les données du bloc texte du slide et du titre flottant en fonction du layout sélectionné
                switch(data.config.selecteurLayoutCentre) {
                    case "layout1":
                        /* bloc texte en bas à droite */
                        
                        tailleBloc = parseInt(data.config.largeurBlocTexteCentreLayout1) / 100;
                        hauteurBloc = parseInt(data.config.hauteurBlocTexteCentreLayout1);
                        posVerticaleBloc = parseInt(data.config.posVerticaleBlocTexteCentreLayout1) / 100;
                        posHorizontaleBloc = parseInt(data.config.posHorizontaleBlocTexteCentreLayout1) / 100;
                        
                        $(idWidget+" .block-text").css("width", tailleBloc * $(idWidget+" .container-image").outerWidth(true)+"px");
                        $(idWidget+" .block-text").css("height", hauteurBloc + hauteurBlocTexteSlide+"px");
                        
                        modifierPositionBlocVerticale(posVerticaleBloc, $(idWidget+" .block-text"), $(idWidget+" .container-image")); 
                        modifierPositionBlocHorizontale(posHorizontaleBloc, $(idWidget+" .block-text"), $(idWidget+" .container-image"));
                        
                        $(idWidget+" .fondBloc").css("background-color", "white");
                        
                        // Réglage de l'ombre s'il est activé
                        if(data.config.ombreBlocFlottant)
                            $(idWidget+" .fondBloc").css("box-shadow", "0px 0px "+data.config.flouOmbre+"px "+data.config.etalementOmbre+"px");
                        break;
                    case "layout2":
                        /* titre flottant et bloc texte avec fond blanc */
                        
                        // Reset quand il essaye de répéter plusieurs fois la même opération
                        $(idWidget+" .titre-flottant").css("width", tailleBloc * $(idWidget+" .container-image").outerWidth(true)+"px");
                        
                        // Control de la largeur
                        $(idWidget+" .block-text").css("width", tailleBloc * $(idWidget+" .container-image").outerWidth(true)+"px");
                        // On redéfinit la hauteur du bloc texte à celle du conteneur (il ne s'adapte pas pour des questions obscures)
                        $(idWidget+" .block-text").css("height", $(idWidget+" .container-text").eq(numSlider).outerHeight(true)+"px");
                        
                        // Représente la hauteur réglable par l'utilisateur
                        $(idWidget+" .titre-flottant").css("margin-top", hauteurBloc / 2+"px");
                        $(idWidget+" .block-text").css("margin-bottom", hauteurBloc / 2+"px");
                        
                        // Le fond flottant est un bloc flottant qui va se mettre derrière nos éléments pour faire croire que c'est le fond des 2 blocs
                        // Donc la hauteur du fond reprend la hauteur des deux éléments
                        hauteurFondFlottant = $(idWidget+" .titre-flottant").outerHeight(true) + $(idWidget+" .block-text").eq(numSlider).outerHeight(true);
                        
                        $(idWidget+" .fond-flottant").css("width", tailleBloc * $(idWidget+" .container-image").outerWidth(true)+"px");
                        $(idWidget+" .fond-flottant").css("height", hauteurFondFlottant+"px");
                        
                        // On positionne les éléments verticalement relativement entre eux
                        modifierPositionRelativeEntreBlocVerticaleAvecFondFlottant(posVerticaleBloc, $(idWidget+" .titre-flottant"), 
                        $(idWidget+" .block-text").eq(numSlider), $(idWidget+" .fond-flottant"), $(idWidget+" .container-image"));
                        
                        // On positionne chaque élément horizontalement
                        modifierPositionBlocHorizontale(posHorizontaleBloc, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                        modifierPositionBlocHorizontale(posHorizontaleBloc, $(idWidget+" .block-text").eq(numSlider), $(idWidget+" .container-image"));
                        modifierPositionBlocHorizontale(posHorizontaleBloc, $(idWidget+" .fond-flottant"), $(idWidget+" .container-image"));
                        
                        // Réglage spécifique
                        $(idWidget+" .block-text").css("background-color", "transparent");
                        $(idWidget+" .titre-flottant").css("background-color", "transparent");
                        $(idWidget+" .fondBloc").css("background-color", "rgba(255, 255, 255, 0.6)");
                        
                        // Réglage de l'ombre s'il est activé
                        if(data.config.ombreBlocFlottant)
                            $(idWidget+" .fondBloc").css("box-shadow", "0px 0px "+data.config.flouOmbre+"px "+data.config.etalementOmbre+"px");
                        break;
                    case "layout3":
                        /* titre flottant et bloc texte sans couleur de fond */
                        
                        // Reset quand il essaye de répéter plusieurs fois la même opération
                        $(idWidget+" .titre-flottant").css("width", tailleBloc * $(idWidget+" .container-image").outerWidth(true)+"px");
                        
                        // Control de la largeur
                        $(idWidget+" .block-text").css("width", tailleBloc * $(idWidget+" .container-image").outerWidth(true)+"px");
                        // On redéfinit la hauteur du bloc texte à celle du conteneur (il ne s'adapte pas pour des questions obscures)
                        $(idWidget+" .block-text").css("height", $(idWidget+" .container-text").eq(numSlider).outerHeight(true)+"px");
                        
                        // Représente la hauteur réglable par l'utilisateur
                        $(idWidget+" .titre-flottant").css("margin-top", hauteurBloc / 2+"px");
                        $(idWidget+" .block-text").css("margin-bottom", hauteurBloc / 2+"px");
                        
                        // Le fond flottant est un bloc flottant qui va se mettre derrière nos éléments pour faire croire que c'est le fond des 2 blocs
                        // Donc la hauteur du fond reprend la hauteur des deux éléments
                        hauteurFondFlottant = $(idWidget+" .titre-flottant").outerHeight(true) + $(idWidget+" .block-text").eq(numSlider).outerHeight(true);
                        
                        $(idWidget+" .fond-flottant").css("width", tailleBloc * $(idWidget+" .container-image").outerWidth(true)+"px");
                        $(idWidget+" .fond-flottant").css("height", hauteurFondFlottant+"px");
                        
                        // On positionne les éléments verticalement relativement entre eux
                        modifierPositionRelativeEntreBlocVerticaleAvecFondFlottant(posVerticaleBloc, $(idWidget+" .titre-flottant"),
                        $(idWidget+" .block-text").eq(numSlider), $(idWidget+" .fond-flottant"), $(idWidget+" .container-image")); //!!!!!
                        
                        // On positionne chaque élément horizontalement
                        modifierPositionBlocHorizontale(posHorizontaleBloc, $(idWidget+" .titre-flottant"), $(idWidget+" .container-image"));
                        modifierPositionBlocHorizontale(posHorizontaleBloc, $(idWidget+" .block-text").eq(numSlider), $(idWidget+" .container-image"));
                        modifierPositionBlocHorizontale(posHorizontaleBloc, $(idWidget+" .fond-flottant"), $(idWidget+" .container-image"));
                        
                        // Réglage spécifique
                        $(idWidget+" .block-text").css("background-color", "transparent");
                        $(idWidget+" .titre-flottant").css("background-color", "transparent");
                        $(idWidget+" .fondBloc").css("background-color", "rgba(255, 255, 255, 0.6)");
                        
                        // Réglage de l'ombre s'il est activé
                        if(data.config.ombreBlocFlottant)
                            $(idWidget+" .fondBloc").css("box-shadow", "0px 0px "+data.config.flouOmbre+"px "+data.config.etalementOmbre+"px");
                        break;
                    default:
                        // 
                        $(idWidget+" .block-text").css("width", tailleBloc * $(idWidget+" .container-image").outerWidth(true)+"px");
                        $(idWidget+" .block-text").css("height", hauteurBloc + hauteurBlocTexteSlide+"px");
                        
                        modifierPositionBlocVerticale(posVerticaleBloc, $(idWidget+" .block-text"), $(idWidget+" .container-image")); 
                        modifierPositionBlocHorizontale(posHorizontaleBloc, $(idWidget+" .block-text"), $(idWidget+" .container-image"));
                        
                        $(idWidget+" .fondBloc").css("background-color", "rgba(255, 255, 255, 0.6)");
                        
                        // Réglage de l'ombre s'il est activé
                        if(data.config.ombreBlocFlottant)
                            $(idWidget+" .block-text").css("box-shadow", "0px 0px "+data.config.flouOmbre+"px "+data.config.etalementOmbre+"px");
                }
            }
        }
    }
    
    // On calcul la différence de la hauteur et de taille du bloc avec la taille de l'image pour
    // être plus précis, la multiplication est donc le coefficient en pourcentage par rapport au container
    
    // A noter que le bloc et le container sont des objets Jquery
    function modifierPositionBlocVerticale(pourcentageVerticale, bloc, container) {
        let hauteurContainer = container.outerHeight(true);
        let hauteurBloc = bloc.outerHeight(true);
        
        let décalageTop = container.position().top;
        let positionVerticale = 0;
        
        if ((pourcentageVerticale*100)>100){ // VJ le parametre position vertical passe de 0-100 à 0-150 pour un chevauchement de la zone texte sur le slide avec une condition si > 100
            positionVerticale = (pourcentageVerticale * (container.outerHeight(true))) - bloc.outerHeight(true) + décalageTop - 40; // VJ modification du calcul,40 pour les points de navigation en position bottom
        }else if ((pourcentageVerticale*100)<=100){
            positionVerticale = pourcentageVerticale * (container.outerHeight(true) - bloc.outerHeight(true)) + décalageTop;
        }
        
        
        bloc.css("top", positionVerticale+"px");
        
        
    }
    // A noter que le bloc et le container sont des elements Jquery
    function modifierPositionBlocHorizontale(pourcentageHorizontale, bloc, container) {
        let largeurContainer = container[0].getBoundingClientRect().width;
        let largeurBloc = bloc[0].getBoundingClientRect().width;
        let décalageLeft = container.position().left;
        let positionHorizontale = pourcentageHorizontale * (largeurContainer - largeurBloc) + décalageLeft;
        
        bloc.css("left", positionHorizontale+"px");
    }
    
    function modifierPositionRelativeEntreBlocVerticale(pourcentageVerticale, bloc, bloc2, container) {
        let maxHauteurBloc = maxOuterHeight(bloc, true);
        let maxHauteurBloc2 = maxOuterHeight(bloc2, true);
        
        let hauteurContainer = container.outerHeight(true);
        let hauteurBloc = bloc.outerHeight(true);
        let hauteurBloc2 = bloc2.outerHeight(true);
        
        // On va dans ce calcul faire comme si le bloc et le bloc2 sont comme un bloc, donc on les additionne et on fait
        // la même méthode pour positionner verticalement
        let blocTop = pourcentageVerticale * (hauteurContainer - (maxHauteurBloc + hauteurBloc2));
        
        // On reprend dans un premier le même calcul pour avoir la même position que le Titre Flottant et on va
        // se mettre juste en dessous de lui, pour ça, on ajoute la hauteur maximum parmi tout les textes du slide.
        // et on ajoute la hauteur du Titre Flottant 
        let bloc2Top = pourcentageVerticale * (hauteurContainer - (maxHauteurBloc + hauteurBloc2)) + maxHauteurBloc;
        
        bloc.css("top", blocTop+"px");
        bloc2.css("top", bloc2Top+"px");
    }
    
    function modifierPositionRelativeEntreBlocVerticaleAvecFondFlottant(pourcentageVerticale, bloc, bloc2, fondFlottant, container) {
        // Prend la hauteur du plus grand bloc texte parmi tout bloc text du slide disponible
        let maxHauteurBloc = maxOuterHeight(bloc, true);
        let maxHauteurBloc2 = maxOuterHeight(bloc2, true);
        
        // On prend la hauteur actuelle de l'élément sélectionné
        let hauteurContainer = container.outerHeight(true);
        let hauteurBloc = bloc.outerHeight(true);
        let hauteurBloc2 = bloc2.outerHeight(true);
        
        // On va dans ce calcul faire comme si le bloc et le bloc2 sont comme un bloc, donc on les additionne et on fait
        // la même méthode pour positionner verticalement
        let blocTop =( pourcentageVerticale * hauteurContainer) - (hauteurBloc + hauteurBloc2) - 40; //VJ modification du calcul 
        
        // On reprend dans un premier le même calcul pour avoir la même position que le Titre Flottant et on va
        // se mettre juste en dessous de lui, pour ça, on ajoute la hauteur maximum parmi tout les textes du slide.
        // et on ajoute la hauteur du Titre Flottant 
        let bloc2Top = (pourcentageVerticale * hauteurContainer) - (hauteurBloc + hauteurBloc2) + hauteurBloc - 40; //VJ modification du calcul
        
        // c'est le même calcul que le blocTop (Titre Flottant)
        let fondFlottantTop = (pourcentageVerticale * hauteurContainer) - (maxHauteurBloc + hauteurBloc2) - 40; //VJ modification du calcul
        
        
        
        bloc.css("top", blocTop+"px");
        bloc2.css("top", bloc2Top+"px");
        fondFlottant.css("top", fondFlottantTop+"px");
    }
    
    // Permet de sélectionner la classe qui a le plus grand attribut, retourne l'attribut avec la valeur la plus grande
    function maxAttribute(element, attribut) {
        let maxAttribute = parseInt(element.css(attribut));
        let attributeTest;
        
        element.each(function(){
            attributeTest = parseInt($(this).css(attribut));
            if(maxAttribute < attributeTest)
                maxAttribute = attributeTest;
        });
        return maxAttribute;
    }
    
    function maxOuterHeight(element, avecMargin) {
        let maxAttribute = element.outerHeight(avecMargin);
        let attributeTest;
    
        element.each(function(){
            attributeTest = $(this).outerHeight(avecMargin);
            if(maxAttribute < attributeTest)
                maxAttribute = attributeTest;
        });
        return maxAttribute;
    }
    
    function isset(element){
        return $.trim(element.text()).length > 0;
    }
    
    function majLayout() {
      
        // En affichant tout les slides, on va scroller automatiquement, on retient cette position pour éviter ce cas
        scrollLeft = $(window).scrollLeft();
        scrollTop = $(window).scrollTop();
        
        // Chaque fois qu'on slide, on réexécute tout pour repositionner le titre flottant
        
        // On affiche tout les autres slider pour avoir la hauteur de tout les autres texte du slider
        $(idWidget+" .slide").each(function(i) {
            $(this).removeClass('masked');
        });
        
        $(initLLayout);
        
        // on remasque tout les autres
        $(idWidget+" .slide").each(function(i) {
            if(i != numSlider)
                $(this).addClass('masked');  
        });
        
        // On scroll à l'ancien point
        scrollTo(scrollLeft, scrollTop);
    }
    
    // Prend l'id du Widget
    var idWidget = IdNameWidget();
    
    // Permettra de controler la taille du texte
    var tailleBlocTexte;
    var widthContainer;
    // Permettra de controler la taille de l'image
    var tailleImage;
    
    // Permettra de controler la hauteur de l'image
    var hauteurImage;
    var hauteurBlocTexte;
    // Permettra de controler la hauteur du container
    var hauteurContainer;
    var hauteurFondFlottant;
    
    var tailleFlottant;
    var hauteurFlottant;
    var posVerticaleFlottant;
    var posHorizontaleFlottant;
    
    var tailleBloc;
    var hauteurBloc;
    var posVerticaleBloc;
    var posHorizontaleBloc;
    
    // Un peu plus spécifique pour le mobile
    var hauteurBlocTexteSlide;
    
    var espacementControlSlide;
    
    // Permettront de déterminer si l'élément est présent
    var aTitreFlottant = false;
    var aIconeFlottant = false;
    var aBoutonFlottant = false;
    var aTexte = false;
    var aTitreSlide = false;
    var aDescriptionSlide = false;
    
    // initialisation du Slider
    var slider = $(idWidget+" .slider li");
    var dot;
    var nbSlides = slider.length;
    var dernierIndexSlide = nbSlides -1;
    var numSlider = 0;
    var idTimer = false;
    var scrollLeft;
    var scrollTop;
    
    var textTemporaire;
    var unique = Math.round((new Date()).getTime() / 1000);
    
    $(idWidget+' .container-image img').each(function(index){
        
        let urlImage = $(this).attr('src');
        
        $(this).css('display','none');
        
        $(this).parent().css('background-image', 'url("' + urlImage + '") ');
        
    });
    
    // Gestion des traits
    
    var traitTitreFlottant = data.config.afficherTraitTitreFlottant;
    var traitTitreSlide = data.config.afficherTraitTitreSlide;
    var traitDescription = data.config.afficherTraitTexte;
    
    if(traitTitreFlottant == "trait-haut" || traitTitreFlottant == "trait-haut-bas") {
        if(data.config.estPersonnaliserTrait){
            $(idWidget+" .titre-flottant .trait-haut-perso").addClass("afficherTrait");
            $(idWidget+" .titre-flottant .container-trait-haut").addClass("afficherTrait");
        }else{
            $(idWidget+" .titre-flottant .trait-haut").addClass("afficherTrait");
        }
    }
    
    if(traitTitreFlottant == "trait-bas" || traitTitreFlottant == "trait-haut-bas") {
        if(data.config.estPersonnaliserTrait){
            $(idWidget+" .titre-flottant .trait-bas-perso").addClass("afficherTrait");
            $(idWidget+" .titre-flottant .container-trait-bas").addClass("afficherTrait");
        }else{
            $(idWidget+" .titre-flottant .trait-bas").addClass("afficherTrait");
        }
    }
    
    if(traitTitreSlide == "trait-haut" || traitTitreSlide == "trait-haut-bas") {
        if(data.config.estPersonnaliserTrait){
            $(idWidget+" .container-titre-slide .trait-haut-perso").addClass("afficherTrait");
            $(idWidget+" .container-titre-slide .container-trait-haut").addClass("afficherTrait");
        }else{
            $(idWidget+" .container-titre-slide .trait-haut").addClass("afficherTrait");
        }
    }
    
    if(traitTitreSlide == "trait-bas" || traitTitreSlide == "trait-haut-bas") {
        if(data.config.estPersonnaliserTrait){
            $(idWidget+" .container-titre-slide .trait-bas-perso").addClass("afficherTrait");
            $(idWidget+" .container-titre-slide .container-trait-bas").addClass("afficherTrait");
        }else{
            $(idWidget+" .container-titre-slide .trait-bas").addClass("afficherTrait");
        }
    }
    
    if(traitDescription == "trait-haut" || traitDescription == "trait-haut-bas") {
        if(data.config.estPersonnaliserTrait){
            $(idWidget+" .container-text-slide .trait-haut-perso").addClass("afficherTrait");
            $(idWidget+" .container-text-slide .container-trait-haut").addClass("afficherTrait");
        }else{
            $(idWidget+" .container-text-slide .trait-haut").addClass("afficherTrait");
        }
    }
    
    if(traitDescription == "trait-bas" || traitDescription == "trait-haut-bas") {
        if(data.config.estPersonnaliserTrait){
            $(idWidget+" .container-text-slide .trait-bas-perso").addClass("afficherTrait");
            $(idWidget+" .container-text-slide .container-trait-bas").addClass("afficherTrait");
        }else{
            $(idWidget+" .container-text-slide .trait-bas").addClass("afficherTrait");
        }
    }
    
    // Animation des blocs Images
    
    /*switch(data.config.typeImageAnimation) {
        case "fadein":
            $(idWidget+' .container-image').attr("data-anim-desktop","fadeIn");
            $(idWidget+' .container-image').addClass("fadeIn");
            break;
        case "fadeinleft":
            $(idWidget+' .container-image').attr("data-anim-desktop","fadeInLeft");
            $(idWidget+' .container-image').addClass("fadeInLeft");
            break;
        case "fadeinright":
            $(idWidget+' .container-image').attr("data-anim-desktop","fadeInRight");
            $(idWidget+' .container-image').addClass("fadeInRight");
            break;
        case "bouncein":
            $(idWidget+' .container-image').attr("data-anim-desktop","bounceIn");
            $(idWidget+' .container-image').addClass("bounceIn");
            break;
        case "bounceinleft":
            $(idWidget+' .container-image').attr("data-anim-desktop","bounceInLeft");
            $(idWidget+' .container-image').addClass("bounceInLeft");
            break;
        case "zoomin":
            $(idWidget+' .container-image').attr("data-anim-desktop","zoomIn");
            $(idWidget+' .container-image').addClass("zoomIn");
            break;
        default:
            
    }
    
    switch(data.config.typeTexteAnimation) {
        case "fadein":
            $(idWidget+' .container-text').attr("data-anim-desktop","fadeIn");
            $(idWidget+' .container-text').addClass("fadeIn");
            break;
        case "fadeinleft":
            $(idWidget+' .container-text').attr("data-anim-desktop","fadeInLeft");
            $(idWidget+' .container-text').addClass("fadeInLeft");
            break;
        case "fadeinright":
            $(idWidget+' .container-text').attr("data-anim-desktop","fadeInRight");
            $(idWidget+' .container-text').addClass("fadeInRight");
            break;
        case "bouncein":
            $(idWidget+' .container-text').attr("data-anim-desktop","bounceIn");
            $(idWidget+' .container-text').addClass("bounceIn");
            break;
        case "bounceinleft":
            $(idWidget+' .container-text').attr("data-anim-desktop","bounceInLeft");
            $(idWidget+' .container-text').addClass("bounceInLeft");
            break;
        case "zoomin":
            $(idWidget+' .container-text').attr("data-anim-desktop","zoomIn");
            $(idWidget+' .container-text').addClass("zoomIn");
            break;
        default:
            
    }*/
    
    // On supprime les rteblock
    
    
    
    
     DeleteRteBlock();
    
    // On règle les problèmes liés aux liens connectés
    url();
    
    // Ils vont nous servir pour la version tablette et mobile
    aIconeFlottant = $(idWidget+" .iconeFlottant").length > 0;
    aTitreFlottant = $(idWidget+" .titre-flottant").length > 0;
    aBoutonFlottant = $(idWidget+" .lienFlottant").length > 0;
    
    // On initialise les point du slider et le timer
    
    
    
    init();
    
    // Initialisation du layout par défaut
    $(initLLayout);
    
    
    
    
    
    // Ecoute tout les transistion de tout le widget, il s'exécute plusieurs
    // fois.
    $(idWidget).find("*").on('transitionend', function(){
        majLayout();
    });
        
    $(window).resize(function(){
        majLayout();
    });
    
    
        };
    