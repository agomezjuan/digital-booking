package com.dh.pi.backend.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.pi.backend.app.dto.HotelDTO;
import com.dh.pi.backend.app.service.IHotelService;

@RestController
@RequestMapping("/api/v1/hotels")
public class HotelController {

    @Autowired
    private IHotelService hotelService;

    @PostMapping
    public HotelDTO newHotel(@RequestBody HotelDTO newHotel) {
        return hotelService.createHotel(newHotel);
    }

    @GetMapping
    public List<HotelDTO> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/{id}")
    public HotelDTO getHotel(@PathVariable("id") Long id) {
        return hotelService.getHotel(id);
    }

    @PutMapping("/{id}")
    public HotelDTO updateHotel(@RequestBody HotelDTO hotelDTO, @PathVariable("id") Long id) {
        return hotelService.createHotel(hotelDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteHotel(@PathVariable("id") Long id) {
        hotelService.deleteHotel(id);
    }

}
