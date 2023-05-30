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

import com.dh.pi.backend.app.dto.AddressDTO;
import com.dh.pi.backend.app.service.IAddressService;

@RestController
@RequestMapping("/api/v1/address")
public class AddressController {

    @Autowired
    private IAddressService addressService;

    @PostMapping("/new")
    public AddressDTO createAddress(@RequestBody AddressDTO addressDTO) {
        return addressService.createAddress(addressDTO);
    }

    @GetMapping("/")
    public List<AddressDTO> getAllAddresses() {
        return addressService.getAllAddresses();
    }

    @GetMapping("/{id}")
    public AddressDTO getAddress(@PathVariable Long id) {
        return addressService.getAddressById(id);
    }

    @PutMapping("/{id}")
    public AddressDTO updateAddress(@RequestBody AddressDTO addressDTO, @PathVariable Long id) {

        return addressService.updateAddress(addressDTO, id);
    }

    @DeleteMapping("/{id}")
    public void deleteAddress(Long id) {
        addressService.deleteAddress(id);
    }
}
