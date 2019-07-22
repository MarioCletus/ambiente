package ambiente.ambiente;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;


@Entity
public class Perfil {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")
	private Integer id;
	
    @Column(name = "nombre")
	private String nombre;

	@OneToMany(targetEntity=Magnitud.class)
	private List <Magnitud> magnitudes;
	
	@ManyToOne(targetEntity=Cultivo.class)
	Cultivo cultivo;
	
	public Cultivo getCultivo() {
		return cultivo;
	}

	public void setCultivo(Cultivo cultivo) {
		this.cultivo = cultivo;
	}

	public List<Magnitud> getMagnitudes() {
		return magnitudes;
	}

	public void setMagnitudes(List<Magnitud> magnitudes) {
		this.magnitudes = magnitudes;
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

}