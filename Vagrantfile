# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "trusty64"
  config.vm.box_url = "https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"

  # --- app server ---
  config.vm.define :web, primary: true do |web_config|
    web_config.vm.host_name = "cta"
    web_config.vm.network :private_network, ip: "192.168.33.84"
    web_config.vm.network :forwarded_port, guest: 80, host: 8484
    web_config.vm.provider :virtualbox do |vb|
      vb.name = "cta"
      vb.customize ["modifyvm", :id, "--cpuexecutioncap", "90"]
      vb.customize ["modifyvm", :id, "--memory", "2048"]
      vb.customize ["modifyvm", :id, "--cpus", 2]
    end
    web_config.vm.synced_folder "./", "/vagrant", :nfs => true
  end

  config.ssh.forward_agent = true

  config.vm.provision "ansible" do |ansible|
    ansible.verbose = "v"
    ansible.playbook = "vagrant.yml"
    # puts ansible.methods.inspect
    # ansible.groups = {"cta" => ["cta"]}
    # ansible.inventory_path = "hosts"
  end

end
