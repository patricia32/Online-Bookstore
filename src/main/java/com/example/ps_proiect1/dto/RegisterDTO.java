
package com.example.ps_proiect1.dto;

        import lombok.AllArgsConstructor;
        import lombok.Getter;
        import lombok.NoArgsConstructor;
        import lombok.Setter;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterDTO {
    private String name;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String address;

}
