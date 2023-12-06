﻿using System.ComponentModel.DataAnnotations;

namespace WebAPI.DataTransferObjects.Account
{
    public class LoginRequestDTO
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}