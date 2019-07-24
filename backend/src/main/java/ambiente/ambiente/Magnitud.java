package ambiente.ambiente;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
//import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="MAGNITUD")
public class Magnitud {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")
	private Integer id;
	
	@ElementCollection
	private List<Float> listOfFloats = new ArrayList<Float>();
	
	@Column(name="nombre")
	private String nombre;

	/*
	@ManyToOne(targetEntity=Usuario.class)
	Usuario usuario;

	@ManyToOne(targetEntity=Perfil.class)
	Perfil perfil;
	
	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public Perfil getPerfil() {
		return perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}
*/
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

	public List<Float> getListOfFloats() {
	return this.listOfFloats;
	}

	public void setListOfFloats(List <Float> valores) {
		this.listOfFloats=valores;
	
	}

	
}