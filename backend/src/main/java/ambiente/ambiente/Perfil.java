package ambiente.ambiente;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;



@Entity
public class Perfil {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")
	private Integer id;
	
    @Column(name = "nombre")
	private String nombre;
	

    public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	@ManyToMany
	@JoinTable(name="perfil_magnitudes"
		,joinColumns=@JoinColumn(name="perfil_id")
		,inverseJoinColumns=@JoinColumn(name="magnitud_id")
	)
	private Set <Magnitud> magnitudes;
	
	
	public Set<Magnitud> getMagnitudes() {
		return magnitudes;
	}

	public void setMagnitudes(Set<Magnitud> magnitudes) {
		this.magnitudes = magnitudes;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

}