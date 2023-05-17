package com.dh.pi.backend.app.service;

import java.util.List;

import com.dh.pi.backend.app.dto.RoleDTO;

import jakarta.validation.Valid;

public interface IRoleService {
    public RoleDTO createRole(@Valid RoleDTO roleDTO);

    public RoleDTO getRole(Long id);

    public List<RoleDTO> getAllRoles();

    public void deleteRole(Long id);
}
