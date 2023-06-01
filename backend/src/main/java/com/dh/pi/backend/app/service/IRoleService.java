package com.dh.pi.backend.app.service;

import java.util.List;

import com.dh.pi.backend.app.dto.RoleDTO;
import com.dh.pi.backend.app.model.Role;

import jakarta.validation.Valid;

public interface IRoleService {
    public RoleDTO createRole(@Valid RoleDTO roleDTO);

    public List<RoleDTO> getAllRoles();

    public RoleDTO getRole(Long id);

    public RoleDTO getRoleByName(String name);

    public void deleteRole(Long id);

    public Role getDefaultRole();
}
