package com.dh.pi.backend.app.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dh.pi.backend.app.dto.RoleDTO;
import com.dh.pi.backend.app.exception.RoleNotFoundException;
import com.dh.pi.backend.app.model.Role;
import com.dh.pi.backend.app.repository.IRoleRepository;
import com.dh.pi.backend.app.service.IRoleService;

import jakarta.validation.Valid;

@Service
public class RoleServiceImpl implements IRoleService {

    @Autowired
    private IRoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public RoleDTO createRole(@Valid RoleDTO roleDTO) {
        Role roleEntity = modelMapper.map(roleDTO, Role.class);
        roleEntity = roleRepository.save(roleEntity);

        return modelMapper.map(roleEntity, RoleDTO.class);
    }

    @Override
    public RoleDTO getRole(Long id) throws RoleNotFoundException {

        Role role = roleRepository.findById(id).get();
        RoleDTO roleDTO = modelMapper.map(role, RoleDTO.class);

        return roleDTO;
    }

    @Override
    public List<RoleDTO> getAllRoles() {
        List<Role> listRoleEntity = roleRepository.findAll();
        List<RoleDTO> listRoleDto = listRoleEntity.stream().map(role -> modelMapper.map(role, RoleDTO.class))
                .collect(Collectors.toList());
        return listRoleDto;
    }

    @Override
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }

    @Override
    public Role getDefaultRole() {
        return roleRepository.findByAuthority("USER").get();
    }

    @Override
    public RoleDTO getRoleByName(String name) throws RoleNotFoundException {

        if (!roleRepository.findByAuthority(name).isPresent()) {
            throw new RoleNotFoundException("Role not found");
        }

        Role role = roleRepository.findByAuthority(name).get();

        RoleDTO roleDTO = modelMapper.map(role, RoleDTO.class);

        return roleDTO;
    }
}