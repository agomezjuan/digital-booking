package com.dh.pi.backend.app.service;

import java.util.List;

import com.dh.pi.backend.app.dto.HotelDTO;

public interface IHotelService {
    public HotelDTO createHotel(HotelDTO hotelDTO);

    public List<HotelDTO> getAllHotels();

    public HotelDTO getHotel(Long id);

    public HotelDTO updateHotel(HotelDTO hotelDTO, Long id);

    public void deleteHotel(Long id);
}
