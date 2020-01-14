

$(document).ready(function() {



    //Header

    $('.toggle-button').click(function() {

        $('.nav-header').slideToggle();

    })



    function wSkills() {



        $('.skill .bar-skill .percent-skill').each(function() {

            $percent =  $(this).data('percent');

            $(this).css('width', $percent + '%');

          });

    }



    wSkills();

    function choseIcon(itemType){
        if (itemType == 'typeUrl') {
            var icon = '<i class="fas fa-link"></i>';
            return icon;
        } else if (itemType == 'imagen') {
            var icon = '<i class="far fa-image"></i>';
            return icon; 
        } else if (itemType == 'video'){
            var icon = '<i class="fas fa-video"></i>';
            return icon; 
        }
    }


    function openModal(buttons){
        let buttonsModal = document.querySelectorAll(buttons);
        let modalWindow = document.querySelector('.modal-portfolio');

        for(let buttonModal of buttonsModal){
            buttonModal.addEventListener('click', function(e){
                let sourceImage = this.dataset.src;
                e.preventDefault();
                let contModal = modalWindow.querySelector('.content-modal');
                contModal.innerHTML = `<img src="${sourceImage}">`;
                modalWindow.classList.toggle("show-modal");
            })
        }

        modalWindow.addEventListener('click', function() {
            this.classList.toggle("show-modal");
        })
    }


    function consultaItems(){
        var container = document.querySelector('.container-gallery');

        fetch('https://univercity.com.co/api/portfolio/post.php')
        .then(data => data.json())
        .then(data =>{
            for (let item of data) {

                container.innerHTML += `
                    <div class="col-12 col-md-4 container-item-gallery" data-category="${item.category}">
                        <div class="item-gallery">
                            <img src="${item.picture}" alt="" class="img-fluid">
                            <div class="caption-gallery">
                                <div class="info-portfolio">
                                    <a href="${item.link}" class="button-link button-link-dark ${item.type}" data-type="${item.type}" data-src="${item.image_src}" target="_blank">${choseIcon(item.type)}</a>
                                    <h5 class="work">${item.name}</h5>
                                    <p class="customer">${item.client}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }

            //Buttons type

            openModal('.info-portfolio .imagen, .info-portfolio .video');
            
        });
    }

    consultaItems();
    

    function filterCategory() {

       $('.nav-categories .nav-link').click(function(e) {

           e.preventDefault();

           $('.nav-categories .nav-link').removeClass('active');

           $(this).addClass('active');

           $category = $(this).data('category');

           if ($category == 'all-items') {

            $('.container-item-gallery').fadeIn();

           } else {

                $('.container-item-gallery').fadeOut();

                $categoriaItem = $('.container-item-gallery').data('category');



                $('.container-item-gallery[data-category*='+ $category +']').fadeIn();

           }

       });

    }



    filterCategory();

    //Owl Carousel

    $('.owl-carousel').owlCarousel({

        

        autoplay: true,

        autoplayTimeout: 3000,

        slideTransition: 'linear',

        loop: true,

        responsive:{

            0:{

                items: 1

            },



            480:{

                items: 6

            },



            768:{

                items: 8

            }

        }

    });



    //SmoothScroll



    $('html').smoothScroll();


    $('.form-group').click(function() {

        $(".form-group label").css('transform','translateY(20px)');

        $("label" , this).css('transform','translateY(0)');

        $("label" , this).css('transform','translateY(0)');

    })


    //Envio formulario
    var formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        var datos = new FormData(formulario);
        let nombre = datos.get('nombre');
        let telefono = datos.get('telefono');
        let correo = datos.get('correo');
        let mensaje = datos.get('mensaje')

        /*
        let nombre = document.getElementById('nombre');
        let telefono = document.getElementById('telefono');
        let correo = document.getElementById('correo');
        let mensaje = document.getElementById('mensaje');

        var datos = {
            nombre : nombre.value,
            telefono: telefono.value,
            correo: correo.value,
            mensaje: mensaje.value
        };*/


        console.log(datos);

        fetch('../send-mail.php', {
            method: 'POST',
            body: datos
        })

        .then(function(response) {
            return response.json();
        })

        .then(function(myJson) {
            console.log(myJson);
          });
    })

    

});