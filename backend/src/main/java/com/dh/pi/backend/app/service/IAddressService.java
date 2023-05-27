package com.dh.pi.backend.app.service;

import java.util.List;

import com.dh.pi.backend.app.dto.AddressDTO;

import jakarta.validation.Valid;

public interface IAddressService {
    public AddressDTO createAddress(@Valid AddressDTO addressDTO);

    public List<AddressDTO> getAllAddresses();

    public AddressDTO getAddressById(Long id);

    public AddressDTO updateAddress(@Valid AddressDTO addressDTO, Long id);

    public void deleteAddress(Long id);
}
