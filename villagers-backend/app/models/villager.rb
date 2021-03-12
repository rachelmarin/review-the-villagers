class Villager < ApplicationRecord
    has_many :reviews

    validates :name, :img_url, presence: true 
end
