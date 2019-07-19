package ambiente.ambiente;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Usuario {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")
	private Integer id;
	
    @Column(name = "userName")
	private String userName;

	@Column(name = "nombre")
	private String nombre;

    @Column(name = "apellido")
	private String apellido;

    @Column(name = "password")
	private String password;
    
	@OneToMany(targetEntity=Calendario.class)
	private List <Calendario> calendarios;    

	@OneToMany(targetEntity=Cultivo.class)
	private List <Cultivo> cultivos;    

	@OneToMany(targetEntity=Perfil.class)
	private List <Perfil> perfiles;    

	@OneToMany(targetEntity=Magnitud.class)
	private List <Magnitud> magnitudes;    

	public List<Perfil> getPerfiles() {
		return perfiles;
	}

	public void setPerfiles(List<Perfil> perfiles) {
		this.perfiles = perfiles;
	}

	public List<Magnitud> getMagnitudes() {
		return magnitudes;
	}

	public void setMagnitudes(List<Magnitud> magnitudes) {
		this.magnitudes = magnitudes;
	}


	public List<Cultivo> getCultivos() {
		return cultivos;
	}

	public void setCultivos(List<Cultivo> cultivos) {
		this.cultivos = cultivos;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Calendario> getCalendarios() {
		return this.calendarios;
	}

	public void setCalendarios(List<Calendario> calendarios) {
		this.calendarios = calendarios;
	}

	
}
