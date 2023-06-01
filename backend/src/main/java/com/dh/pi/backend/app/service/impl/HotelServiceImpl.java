package com.dh.pi.backend.app.service.impl;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dh.pi.backend.app.dto.HotelDTO;
import com.dh.pi.backend.app.model.Address;
import com.dh.pi.backend.app.model.Hotel;
import com.dh.pi.backend.app.repository.IHotelRepository;
import com.dh.pi.backend.app.service.IHotelService;

@Service
public class HotelServiceImpl implements IHotelService {

    @Autowired
    private IHotelRepository hotelRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public HotelDTO createHotel(HotelDTO hotelDTO) {
        Hotel hotelEntity = modelMapper.map(hotelDTO, Hotel.class);

        hotelEntity = hotelRepository.save(hotelEntity);

        return modelMapper.map(hotelEntity, HotelDTO.class);
    }

    @Override
    public List<HotelDTO> getAllHotels() {
        List<Hotel> hotelEntity = hotelRepository.findAll();
        List<HotelDTO> hotelsDTO = hotelEntity.stream().map(hotel -> modelMapper.map(hotel, HotelDTO.class)).toList();

        return hotelsDTO;
    }

    @Override
    public HotelDTO getHotel(Long id) {
        Hotel hotel = hotelRepository.findById(id).get();
        HotelDTO hotelDTO = modelMapper.map(hotel, HotelDTO.class);

        return hotelDTO;
    }

    @Override
    public HotelDTO updateHotel(HotelDTO hotelDTO, Long id) {

        Hotel hotelEntity = hotelRepository.findById(id).get();

        if (hotelDTO.getName() != null) {
            hotelEntity.setName(hotelDTO.getName());
        }
        if (hotelDTO.getPhone() != null) {
            hotelEntity.setPhone(hotelDTO.getPhone());
        }
        if (hotelDTO.getDescription() != null) {
            hotelEntity.setDescription(hotelDTO.getDescription());
        }
        if (hotelDTO.getEmail() != null) {
            hotelEntity.setEmail(hotelDTO.getEmail());
        }
        if (hotelDTO.getImage() != null) {
            hotelEntity.setImage(hotelDTO.getImage());
        }
        if (hotelDTO.getAddress() != null) {
            Address address = modelMapper.map(hotelDTO.getAddress(), Address.class);
            hotelEntity.setAddress(address);
        }

        hotelEntity = hotelRepository.save(hotelEntity);

        return modelMapper.map(hotelEntity, HotelDTO.class);
    }

    @Override
    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }

}
