package ambiente.ambiente;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Cultivo {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")
	private Integer id;

	@Column(name = "nombre")
	private String nombre;

// 	@OneToMany(targetEntity=Perfil.class)
//	List<Perfil> perfiles;

	
 	@OneToMany(targetEntity=Dia.class)
	List<Dia> dias;

	public void addDias(List<Dia> dias) {
		for(Dia dia:dias) {
			this.dias.add(dia);	
		}
	}
 	
	public List<Dia> getDias() {
		return dias;
	}

	public void setDias(List<Dia> dias) {
		this.dias = dias;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

/*	public List<Perfil> getPerfiles() {
		return perfiles;
	}

	public void setPerfiles(List<Perfil> perfiles) {
		this.perfiles = perfiles;
	}
*/
}
