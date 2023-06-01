package com.dh.pi.backend.app.service.impl;

import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dh.pi.backend.app.dto.AddressDTO;
import com.dh.pi.backend.app.model.Address;
import com.dh.pi.backend.app.repository.IAddressRepository;
import com.dh.pi.backend.app.service.IAddressService;

import jakarta.validation.Valid;

@Service
public class AddressServiceImpl implements IAddressService {

    @Autowired
    private IAddressRepository addressRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AddressDTO createAddress(@Valid AddressDTO addressDTO) {
        Address addressEntity = modelMapper.map(addressDTO, Address.class);

        addressEntity = addressRepository.save(addressEntity);

        return modelMapper.map(addressEntity, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAllAddresses() {
        List<Address> addressEntity = addressRepository.findAll();
        List<AddressDTO> addressesDTO = addressEntity.stream()
                .map(address -> modelMapper.map(address, AddressDTO.class)).toList();

        return addressesDTO;
    }

    @Override
    public AddressDTO getAddressById(Long id) {
        Address address = addressRepository.findById(id).get();
        AddressDTO addressDTO = modelMapper.map(address, AddressDTO.class);

        return addressDTO;
    }

    @Override
    public AddressDTO updateAddress(@Valid AddressDTO addressDTO, Long id) {
        Address addressEntity = modelMapper.map(addressDTO, Address.class);

        addressEntity = addressRepository.save(addressEntity);

        return modelMapper.map(addressEntity, AddressDTO.class);
    }

    @Override
    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }

}
