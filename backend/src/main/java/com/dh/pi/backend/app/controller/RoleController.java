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

import com.dh.pi.backend.app.dto.RoleDTO;
import com.dh.pi.backend.app.service.IRoleService;

@RestController
@RequestMapping("/api/v1/admin/roles")
public class RoleController {

    @Autowired
    private IRoleService roleService;

    @PostMapping("/new")
    RoleDTO newRole(@RequestBody RoleDTO newRole) {
        return roleService.createRole(newRole);
    }

    @GetMapping("/all")
    public List<RoleDTO> getAllRoles() {
        return roleService.getAllRoles();
    }

    @GetMapping("/{id}")
    public RoleDTO getRole(@PathVariable("id") Long id) {
        return roleService.getRole(id);
    }

    @PutMapping("/{id}")
    public RoleDTO updateRole(@RequestBody RoleDTO roleDTO, @PathVariable("id") Long id) {
        return roleService.createRole(roleDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable("id") Long id) {
        roleService.deleteRole(id);
    }

}
