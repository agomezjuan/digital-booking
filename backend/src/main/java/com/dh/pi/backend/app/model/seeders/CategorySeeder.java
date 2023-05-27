package com.dh.pi.backend.app.model.seeders;

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
        Category category1 = new Category();

        category1.setName("Eco-Lodges");
        category1.setDescription(
                "Estos alojamientos sostenibles y en armonía con la naturaleza ofrecen una experiencia única en entornos naturales. Utilizan prácticas ecológicas y ofrecen comodidades modernas mientras respetan el medio ambiente.");

        Category category2 = new Category();

        category2.setName("Alojamientos Temáticos");
        category2.setDescription(
                "Estos alojamientos ofrecen una experiencia inmersiva y temática, desde cabañas inspiradas en cuentos de hadas hasta hoteles diseñados en torno a una temática específica, brindando un ambiente único y memorable.");

        Category category3 = new Category();

        category3.setName("Hoteles Boutique");
        category3.setDescription(
                "Estos hoteles exclusivos y de pequeña escala ofrecen un servicio personalizado y atención al detalle. Son conocidos por su diseño elegante, ambiente íntimo y enfoque en la experiencia del huésped.");

        Category category4 = new Category();

        category4.setName("Glamping (camping de lujo)");
        category4.setDescription(
                "Combina la conexión con la naturaleza y el lujo. Los huéspedes disfrutan de comodidades de alta gama en tiendas de campaña espaciosas o estructuras únicas mientras se sumergen en el entorno natural.");

        Category category5 = new Category();

        category5.setName("Alojamientos Históricos o Culturales");
        category5.setDescription(
                "Estos alojamientos se encuentran en edificios históricos o culturales, ofreciendo una experiencia auténtica y enriquecedora. Los huéspedes pueden sumergirse en la historia y la cultura del lugar mientras disfrutan de comodidades modernas.");

        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);
        categoryRepository.save(category4);
        categoryRepository.save(category5);

        log.info(
                "Se han creado las categorías 'Eco-Lodges', 'Alojamientos Temáticos', 'Hoteles Boutique', 'Glamping (camping de lujo)' y 'Alojamientos Históricos o Culturales'");

    }

}
