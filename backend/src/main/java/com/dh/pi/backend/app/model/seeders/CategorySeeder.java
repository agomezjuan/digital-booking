package com.dh.pi.backend.app.model.seeders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.dh.pi.backend.app.model.Category;
import com.dh.pi.backend.app.repository.ICategoryRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CategorySeeder implements ApplicationListener<ContextRefreshedEvent> {

        @Autowired
        private ICategoryRepository categoryRepository;

        @Override
        public void onApplicationEvent(ContextRefreshedEvent event) {

                Category category1 = categoryRepository.findByName("Eco-Lodges");

                if (category1 == null) {
                        createCategories();
                }
        }

        private void createCategories() {
                categoryRepository.saveAll(List.of(
                                new Category("Eco-Lodges",
                                                "Estos alojamientos sostenibles y en armonía con la naturaleza ofrecen una experiencia única en entornos naturales. Utilizan prácticas ecológicas y ofrecen comodidades modernas mientras respetan el medio ambiente."),
                                new Category("Alojamientos Temáticos",
                                                "Estos alojamientos ofrecen una experiencia inmersiva y temática, desde cabañas inspiradas en cuentos de hadas hasta hoteles diseñados en torno a una temática específica, brindando un ambiente único y memorable."),
                                new Category("Hoteles Boutique",
                                                "Estos hoteles exclusivos y de pequeña escala ofrecen un servicio personalizado y atención al detalle. Son conocidos por su diseño elegante, ambiente íntimo y enfoque en la experiencia del huésped."),
                                new Category("Glamping (camping de lujo)",
                                                "Combina la conexión con la naturaleza y el lujo. Los huéspedes disfrutan de comodidades de alta gama en tiendas de campaña espaciosas o estructuras únicas mientras se sumergen en el entorno natural."),
                                new Category("Alojamientos Históricos o Culturales",
                                                "Estos alojamientos se encuentran en edificios históricos o culturales, ofreciendo una experiencia auténtica y enriquecedora. Los huéspedes pueden sumergirse en la historia y la cultura del lugar mientras disfrutan de comodidades modernas.")));

                log.info("Se han creado las categorías 'Eco-Lodges', 'Alojamientos Temáticos', 'Hoteles Boutique', 'Glamping (camping de lujo)' y 'Alojamientos Históricos o Culturales'");

        }

}
